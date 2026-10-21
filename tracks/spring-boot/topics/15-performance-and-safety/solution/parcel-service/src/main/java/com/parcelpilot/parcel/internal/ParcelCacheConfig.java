package com.parcelpilot.parcel.internal;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

import java.time.Duration;

@Configuration
@EnableCaching
public class ParcelCacheConfig {

    /** The "parcels" cache: JSON values in Redis, each sticky note thrown away after 10 minutes. */
    @Bean
    RedisCacheManagerBuilderCustomizer parcelsCache(ObjectMapper objectMapper) {
        var json = new Jackson2JsonRedisSerializer<>(objectMapper, ParcelResponse.class);
        return builder -> builder.withCacheConfiguration("parcels",
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofMinutes(10))
                        .serializeValuesWith(SerializationPair.fromSerializer(json)));
    }
}
