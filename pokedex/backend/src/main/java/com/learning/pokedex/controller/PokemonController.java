package com.learning.pokedex.controller;

import com.learning.pokedex.dto.PokemonDetailResponse;
import com.learning.pokedex.dto.PokemonListResponse;
import com.learning.pokedex.dto.PokemonTypesResponse;
import com.learning.pokedex.service.PokemonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public PokemonListResponse list(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {
        return pokemonService.listPokemon(offset, limit, type, sortBy, sortOrder);
    }

    @GetMapping("/types")
    public PokemonTypesResponse types() {
        return pokemonService.listTypes();
    }

    @GetMapping("/{identifier}")
    public PokemonDetailResponse detail(@PathVariable String identifier) {
        return pokemonService.getPokemon(identifier);
    }
}
