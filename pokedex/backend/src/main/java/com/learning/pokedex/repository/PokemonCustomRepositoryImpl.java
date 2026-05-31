package com.learning.pokedex.repository;

import com.learning.pokedex.entity.Pokemon;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PokemonCustomRepositoryImpl implements PokemonCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    private final SqlQueryLogger sqlQueryLogger;

    public PokemonCustomRepositoryImpl(SqlQueryLogger sqlQueryLogger) {
        this.sqlQueryLogger = sqlQueryLogger;
    }

    @Override
    @SuppressWarnings("unchecked")
    public PokemonQueryResult findPage(PokemonQueryParams rawParams) {
        PokemonQueryParams params = rawParams.normalized();

        String listSql = buildListSql(params);
        String countSql = buildCountSql(params);

        sqlQueryLogger.log("list-count", formatSql(countSql, params));
        sqlQueryLogger.log("list", formatSql(listSql, params));

        var countQuery = entityManager.createNativeQuery(countSql);
        bindTypeParam(countQuery, params);
        long total = ((Number) countQuery.getSingleResult()).longValue();

        var listQuery = entityManager.createNativeQuery(listSql, Pokemon.class);
        bindTypeParam(listQuery, params);
        listQuery.setParameter("limit", params.limit());
        listQuery.setParameter("offset", params.offset());

        List<Pokemon> items = listQuery.getResultList();
        String displaySql = formatSql(listSql, params) + "\n-- total count query:\n" + formatSql(countSql, params);

        return new PokemonQueryResult(items, total, displaySql);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<Pokemon> findByIdWithSql(int id) {
        String sql = "SELECT * FROM pokemon WHERE id = :id";
        sqlQueryLogger.log("detail-by-id", formatDetailByIdSql(id));

        List<Pokemon> results = entityManager
                .createNativeQuery(sql, Pokemon.class)
                .setParameter("id", id)
                .getResultList();

        return results.isEmpty() ? Optional.empty() : Optional.of(results.getFirst());
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<Pokemon> findByNameIgnoreCaseWithSql(String name) {
        String sql = "SELECT * FROM pokemon WHERE LOWER(name) = LOWER(:name)";
        sqlQueryLogger.log("detail-by-name", formatDetailByNameSql(name));

        List<Pokemon> results = entityManager
                .createNativeQuery(sql, Pokemon.class)
                .setParameter("name", name)
                .getResultList();

        return results.isEmpty() ? Optional.empty() : Optional.of(results.getFirst());
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> findDistinctTypes() {
        String sql = "SELECT DISTINCT type_name FROM pokemon_type ORDER BY type_name";
        sqlQueryLogger.log("types", sql);

        return entityManager.createNativeQuery(sql).getResultList();
    }

    private String buildListSql(PokemonQueryParams params) {
        String orderColumn = params.sqlSortColumn();
        String orderDirection = params.sortOrder().toUpperCase();

        if (params.type() != null) {
            return """
                    SELECT DISTINCT p.*
                    FROM pokemon p
                    INNER JOIN pokemon_type pt ON pt.pokemon_id = p.id
                    WHERE pt.type_name = :type
                    ORDER BY p.%s %s
                    LIMIT :limit OFFSET :offset
                    """.formatted(orderColumn, orderDirection);
        }

        return """
                SELECT * FROM pokemon
                ORDER BY %s %s
                LIMIT :limit OFFSET :offset
                """.formatted(orderColumn, orderDirection);
    }

    private String buildCountSql(PokemonQueryParams params) {
        if (params.type() != null) {
            return """
                    SELECT COUNT(DISTINCT p.id)
                    FROM pokemon p
                    INNER JOIN pokemon_type pt ON pt.pokemon_id = p.id
                    WHERE pt.type_name = :type
                    """;
        }
        return "SELECT COUNT(*) FROM pokemon";
    }

    private void bindTypeParam(jakarta.persistence.Query query, PokemonQueryParams params) {
        if (params.type() != null) {
            query.setParameter("type", params.type());
        }
    }

    private String formatSql(String sql, PokemonQueryParams params) {
        String formatted = sql.trim();
        if (params.type() != null) {
            formatted = formatted.replace(":type", quote(params.type()));
        }
        return formatted
                .replace(":limit", String.valueOf(params.limit()))
                .replace(":offset", String.valueOf(params.offset()));
    }

    private String formatDetailByIdSql(int id) {
        return "SELECT * FROM pokemon WHERE id = " + id;
    }

    private String formatDetailByNameSql(String name) {
        return "SELECT * FROM pokemon WHERE LOWER(name) = LOWER(" + quote(name) + ")";
    }

    private String quote(String value) {
        return "'" + value.replace("'", "''") + "'";
    }
}
