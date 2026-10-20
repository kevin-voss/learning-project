package com.learning.pokedex.dto;

import java.util.List;

public record PokemonDetailResponse(
        int id,
        String name,
        int height,
        int weight,
        List<TypeSlotDto> types,
        SpritesDto sprites,
        String sql
) {
}
