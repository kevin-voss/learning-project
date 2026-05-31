package com.learning.pokedex.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pokemon")
public class Pokemon {

    @Id
    private Integer id;

    @Column(nullable = false, unique = true, length = 64)
    private String name;

    @Column(name = "height_dm", nullable = false)
    private Integer heightDm;

    @Column(name = "weight_hg", nullable = false)
    private Integer weightHg;

    @Column(name = "sprite_url")
    private String spriteUrl;

    @OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("slot ASC")
    private List<PokemonType> types = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHeightDm() {
        return heightDm;
    }

    public void setHeightDm(Integer heightDm) {
        this.heightDm = heightDm;
    }

    public Integer getWeightHg() {
        return weightHg;
    }

    public void setWeightHg(Integer weightHg) {
        this.weightHg = weightHg;
    }

    public String getSpriteUrl() {
        return spriteUrl;
    }

    public void setSpriteUrl(String spriteUrl) {
        this.spriteUrl = spriteUrl;
    }

    public List<PokemonType> getTypes() {
        return types;
    }

    public void setTypes(List<PokemonType> types) {
        this.types = types;
    }
}
