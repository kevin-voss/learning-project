package com.learning.pokedex.repository;

import com.learning.pokedex.entity.Pokemon;

import java.util.List;
import java.util.Optional;

public interface PokemonCustomRepository {

    PokemonQueryResult findPage(PokemonQueryParams params);

    Optional<Pokemon> findByIdWithSql(int id);

    Optional<Pokemon> findByNameIgnoreCaseWithSql(String name);

    List<String> findDistinctTypes();
}
