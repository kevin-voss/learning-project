package com.learning.pokedex.dto;

import java.util.List;

public record PokemonListResponse(
        long count,
        String next,
        String previous,
        List<NamedResourceDto> results,
        String sql
) {
}
