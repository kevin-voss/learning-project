package com.learning.pokedex.service;

import com.learning.pokedex.dto.NamedResourceDto;
import com.learning.pokedex.dto.PokemonDetailResponse;
import com.learning.pokedex.dto.PokemonListResponse;
import com.learning.pokedex.dto.PokemonTypesResponse;
import com.learning.pokedex.dto.SpritesDto;
import com.learning.pokedex.dto.TypeRefDto;
import com.learning.pokedex.dto.TypeSlotDto;
import com.learning.pokedex.entity.Pokemon;
import com.learning.pokedex.entity.PokemonType;
import com.learning.pokedex.repository.PokemonCustomRepository;
import com.learning.pokedex.repository.PokemonQueryParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PokemonService {

    private static final String TYPES_LOOKUP_SQL =
            "SELECT * FROM pokemon_type WHERE pokemon_id = ? ORDER BY slot ASC";

    private final PokemonCustomRepository pokemonCustomRepository;
    private final String apiBasePath;

    public PokemonService(
            PokemonCustomRepository pokemonCustomRepository,
            @Value("${pokedex.api-base-path:/api/pokemon}") String apiBasePath
    ) {
        this.pokemonCustomRepository = pokemonCustomRepository;
        this.apiBasePath = apiBasePath;
    }

    public PokemonListResponse listPokemon(
            int offset,
            int limit,
            String type,
            String sortBy,
            String sortOrder
    ) {
        var params = new PokemonQueryParams(type, sortBy, sortOrder, offset, limit).normalized();
        var queryResult = pokemonCustomRepository.findPage(params);

        var items = queryResult.items().stream()
                .map(pokemon -> new NamedResourceDto(
                        pokemon.getName(),
                        apiBasePath + "/" + pokemon.getId()
                ))
                .toList();

        boolean hasNext = params.offset() + queryResult.items().size() < queryResult.total();
        String next = hasNext
                ? buildListUrl(params.offset() + params.limit(), params)
                : null;
        String previous = params.offset() > 0
                ? buildListUrl(Math.max(0, params.offset() - params.limit()), params)
                : null;

        return new PokemonListResponse(
                queryResult.total(),
                next,
                previous,
                items,
                queryResult.sql()
        );
    }

    public PokemonDetailResponse getPokemon(String identifier) {
        LookupResult lookup = resolvePokemon(identifier)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No Pokémon found for \"" + identifier + "\". Check the spelling."
                ));

        return toDetail(lookup.pokemon(), lookup.sql());
    }

    public PokemonTypesResponse listTypes() {
        var types = pokemonCustomRepository.findDistinctTypes();
        return new PokemonTypesResponse(
                types,
                "SELECT DISTINCT type_name FROM pokemon_type ORDER BY type_name"
        );
    }

    private String buildListUrl(int offset, PokemonQueryParams params) {
        var url = new StringBuilder(apiBasePath)
                .append("?offset=").append(offset)
                .append("&limit=").append(params.limit())
                .append("&sortBy=").append(params.sortBy())
                .append("&sortOrder=").append(params.sortOrder());

        if (params.type() != null) {
            url.append("&type=").append(params.type());
        }

        return url.toString();
    }

    private java.util.Optional<LookupResult> resolvePokemon(String identifier) {
        try {
            int id = Integer.parseInt(identifier);
            return pokemonCustomRepository.findByIdWithSql(id)
                    .map(pokemon -> new LookupResult(
                            pokemon,
                            "SELECT * FROM pokemon WHERE id = " + id
                                    + "\n-- types (loaded by JPA):\n"
                                    + formatTypesSql(pokemon.getId())
                    ));
        } catch (NumberFormatException ignored) {
            return pokemonCustomRepository.findByNameIgnoreCaseWithSql(identifier)
                    .map(pokemon -> new LookupResult(
                            pokemon,
                            "SELECT * FROM pokemon WHERE LOWER(name) = LOWER('" + identifier + "')"
                                    + "\n-- types (loaded by JPA):\n"
                                    + formatTypesSql(pokemon.getId())
                    ));
        }
    }

    private String formatTypesSql(int pokemonId) {
        return TYPES_LOOKUP_SQL.replace("?", String.valueOf(pokemonId));
    }

    private PokemonDetailResponse toDetail(Pokemon pokemon, String sql) {
        var types = pokemon.getTypes().stream()
                .map(this::toTypeSlot)
                .toList();

        return new PokemonDetailResponse(
                pokemon.getId(),
                pokemon.getName(),
                pokemon.getHeightDm(),
                pokemon.getWeightHg(),
                types,
                SpritesDto.fromUrl(pokemon.getSpriteUrl()),
                sql
        );
    }

    private TypeSlotDto toTypeSlot(PokemonType pokemonType) {
        return new TypeSlotDto(
                pokemonType.getSlot(),
                new TypeRefDto(pokemonType.getTypeName(), "")
        );
    }

    private record LookupResult(Pokemon pokemon, String sql) {
    }
}
