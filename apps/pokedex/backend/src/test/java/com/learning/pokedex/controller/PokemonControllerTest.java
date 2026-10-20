package com.learning.pokedex.controller;

import com.learning.pokedex.dto.NamedResourceDto;
import com.learning.pokedex.dto.PokemonDetailResponse;
import com.learning.pokedex.dto.PokemonListResponse;
import com.learning.pokedex.dto.PokemonTypesResponse;
import com.learning.pokedex.dto.SpritesDto;
import com.learning.pokedex.dto.TypeRefDto;
import com.learning.pokedex.dto.TypeSlotDto;
import com.learning.pokedex.service.PokemonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PokemonController.class)
class PokemonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PokemonService pokemonService;

    @Test
    void listReturnsPokemon() throws Exception {
        when(pokemonService.listPokemon(anyInt(), anyInt(), isNull(), eq("id"), eq("asc"))).thenReturn(
                new PokemonListResponse(
                        1,
                        null,
                        null,
                        List.of(new NamedResourceDto("pikachu", "/api/pokemon/25")),
                        "SELECT * FROM pokemon ORDER BY id ASC LIMIT 20 OFFSET 0"
                )
        );

        mockMvc.perform(get("/api/pokemon"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.count").value(1))
                .andExpect(jsonPath("$.results[0].name").value("pikachu"))
                .andExpect(jsonPath("$.sql").exists());
    }

    @Test
    void listAcceptsFilterAndSortParams() throws Exception {
        when(pokemonService.listPokemon(0, 20, "fire", "name", "desc")).thenReturn(
                new PokemonListResponse(
                        12,
                        null,
                        null,
                        List.of(new NamedResourceDto("charmander", "/api/pokemon/4")),
                        "SELECT DISTINCT p.* FROM pokemon p ..."
                )
        );

        mockMvc.perform(get("/api/pokemon?type=fire&sortBy=name&sortOrder=desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.count").value(12));
    }

    @Test
    void typesEndpointReturnsDistinctTypes() throws Exception {
        when(pokemonService.listTypes()).thenReturn(
                new PokemonTypesResponse(
                        List.of("electric", "fire", "water"),
                        "SELECT DISTINCT type_name FROM pokemon_type ORDER BY type_name"
                )
        );

        mockMvc.perform(get("/api/pokemon/types"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.types[0]").value("electric"))
                .andExpect(jsonPath("$.sql").exists());
    }

    @Test
    void detailReturnsPokemon() throws Exception {
        when(pokemonService.getPokemon(eq("pikachu"))).thenReturn(
                new PokemonDetailResponse(
                        25,
                        "pikachu",
                        4,
                        60,
                        List.of(new TypeSlotDto(1, new TypeRefDto("electric", ""))),
                        SpritesDto.fromUrl("https://example.com/sprite.png"),
                        "SELECT * FROM pokemon WHERE LOWER(name) = LOWER('pikachu')"
                )
        );

        mockMvc.perform(get("/api/pokemon/pikachu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("pikachu"))
                .andExpect(jsonPath("$.types[0].type.name").value("electric"))
                .andExpect(jsonPath("$.sql").exists());
    }
}
