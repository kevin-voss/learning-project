package com.learning.pokedex.dto;

import java.util.List;

public record PokemonTypesResponse(
        List<String> types,
        String sql
) {
}
