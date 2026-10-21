package com.parcelpilot;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parcelpilot.ratelimit.RateLimitFilter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/** Unit test: Redis is faked, so we can say "this is request number 21" directly. */
class RateLimitFilterTest {

    // 10:00:42 -> 18 seconds are left in this minute
    private final Clock clock = Clock.fixed(Instant.parse("2026-01-01T10:00:42Z"), ZoneOffset.UTC);
    private final StringRedisTemplate redis = mock(StringRedisTemplate.class);
    @SuppressWarnings("unchecked")
    private final ValueOperations<String, String> counters = mock(ValueOperations.class);
    private final RateLimitFilter filter = new RateLimitFilter(redis, new ObjectMapper(), 20, clock);

    @BeforeEach
    void fakeRedis() {
        when(redis.opsForValue()).thenReturn(counters);
    }

    @Test
    void requestWithinTheLimit_passesThrough() throws Exception {
        when(counters.increment(anyString())).thenReturn(20L);
        MockFilterChain chain = new MockFilterChain();
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilter(new MockHttpServletRequest("GET", "/parcels/P-1"), response, chain);

        assertThat(response.getStatus()).isEqualTo(200);
        assertThat(chain.getRequest()).isNotNull();   // the controller would have been called
    }

    @Test
    void requestOverTheLimit_gets429AndRetryAfter() throws Exception {
        when(counters.increment(anyString())).thenReturn(21L);
        MockFilterChain chain = new MockFilterChain();
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilter(new MockHttpServletRequest("GET", "/parcels/P-1"), response, chain);

        assertThat(response.getStatus()).isEqualTo(429);
        assertThat(response.getHeader("Retry-After")).isEqualTo("18");
        assertThat(response.getContentAsString()).contains("RATE_LIMITED");
        assertThat(chain.getRequest()).isNull();      // the controller was never called
    }
}
