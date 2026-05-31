package com.learning.pokedex.repository;

import com.learning.pokedex.entity.Pokemon;

import java.util.List;

public record PokemonQueryResult(
        List<Pokemon> items,
        long total,
        String sql
) {
}
