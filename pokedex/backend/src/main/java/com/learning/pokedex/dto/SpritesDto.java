package com.learning.pokedex.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public record SpritesDto(
        @JsonProperty("front_default") String frontDefault,
        Map<String, Map<String, String>> other
) {
    public static SpritesDto fromUrl(String spriteUrl) {
        if (spriteUrl == null) {
            return new SpritesDto(null, null);
        }
        return new SpritesDto(
                spriteUrl,
                Map.of("official-artwork", Map.of("front_default", spriteUrl))
        );
    }
}
