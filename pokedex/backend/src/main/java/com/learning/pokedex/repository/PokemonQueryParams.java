package com.learning.pokedex.repository;

/**
 * Safe, whitelisted parameters for building list queries.
 */
public record PokemonQueryParams(
        String type,
        String sortBy,
        String sortOrder,
        int offset,
        int limit
) {
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_ORDER = "asc";

    public PokemonQueryParams normalized() {
        String safeSortBy = isAllowedSortBy(sortBy) ? sortBy : DEFAULT_SORT_BY;
        String safeSortOrder = isAllowedSortOrder(sortOrder) ? sortOrder.toLowerCase() : DEFAULT_SORT_ORDER;
        String safeType = type == null || type.isBlank() ? null : type.trim().toLowerCase();
        int safeOffset = Math.max(0, offset);
        int safeLimit = Math.max(1, Math.min(limit, 100));
        return new PokemonQueryParams(safeType, safeSortBy, safeSortOrder, safeOffset, safeLimit);
    }

    public static boolean isAllowedSortBy(String value) {
        return value != null && switch (value.toLowerCase()) {
            case "id", "name", "height", "weight" -> true;
            default -> false;
        };
    }

    public static boolean isAllowedSortOrder(String value) {
        if (value == null) {
            return false;
        }
        String normalized = value.toLowerCase();
        return normalized.equals("asc") || normalized.equals("desc");
    }

    public String sqlSortColumn() {
        return switch (sortBy) {
            case "name" -> "name";
            case "height" -> "height_dm";
            case "weight" -> "weight_hg";
            default -> "id";
        };
    }
}
