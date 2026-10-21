package com.parcelpilot.ratelimit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parcelpilot.ErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Clock;
import java.time.Duration;
import java.util.Map;

/**
 * Fixed window: each client (IP address) may send {@code limitPerMinute} requests per minute.
 * The counters live in Redis, so every copy of parcel-service shares them.
 */
public class RateLimitFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redis;
    private final ObjectMapper objectMapper;
    private final int limitPerMinute;
    private final Clock clock;

    public RateLimitFilter(StringRedisTemplate redis, ObjectMapper objectMapper, int limitPerMinute, Clock clock) {
        this.redis = redis;
        this.objectMapper = objectMapper;
        this.limitPerMinute = limitPerMinute;
        this.clock = clock;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        long nowSeconds = clock.instant().getEpochSecond();
        long minute = nowSeconds / 60;
        String key = "rate:" + request.getRemoteAddr() + ":" + minute;

        Long count = redis.opsForValue().increment(key);       // +1, atomic in Redis
        if (count != null && count == 1) {
            redis.expire(key, Duration.ofSeconds(60));          // old windows clean themselves up
        }

        if (count != null && count > limitPerMinute) {
            long retryAfter = 60 - (nowSeconds % 60);           // seconds until the next window
            response.setStatus(429);
            response.setHeader("Retry-After", String.valueOf(retryAfter));
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            objectMapper.writeValue(response.getOutputStream(), new ErrorResponse(
                    "RATE_LIMITED", "Too many requests. Try again in " + retryAfter + " seconds.",
                    Map.of(), request.getRequestURI()));
            return;                                             // the request never reaches the controller
        }
        chain.doFilter(request, response);
    }
}
