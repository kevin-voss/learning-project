package com.learning.pokedex.entity;

import java.io.Serializable;
import java.util.Objects;

public class PokemonTypeId implements Serializable {

    private Integer pokemonId;
    private Integer slot;

    public PokemonTypeId() {
    }

    public PokemonTypeId(Integer pokemonId, Integer slot) {
        this.pokemonId = pokemonId;
        this.slot = slot;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }
        PokemonTypeId that = (PokemonTypeId) object;
        return Objects.equals(pokemonId, that.pokemonId) && Objects.equals(slot, that.slot);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pokemonId, slot);
    }
}
