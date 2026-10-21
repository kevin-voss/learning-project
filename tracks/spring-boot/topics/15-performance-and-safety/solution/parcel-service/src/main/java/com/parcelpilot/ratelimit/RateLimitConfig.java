package com.parcelpilot.ratelimit;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.time.Clock;

@Configuration
public class RateLimitConfig {

    /** The bouncer stands at the /parcels door, right after RequestIdFilter. */
    @Bean
    FilterRegistrationBean<RateLimitFilter> rateLimitFilter(
            StringRedisTemplate redis,
            ObjectMapper objectMapper,
            @Value("${parcelpilot.rate-limit.per-minute}") int limitPerMinute) {
        var registration = new FilterRegistrationBean<>(
                new RateLimitFilter(redis, objectMapper, limitPerMinute, Clock.systemUTC()));
        registration.addUrlPatterns("/parcels", "/parcels/*");
        registration.setOrder(Ordered.HIGHEST_PRECEDENCE + 1);
        return registration;
    }
}
