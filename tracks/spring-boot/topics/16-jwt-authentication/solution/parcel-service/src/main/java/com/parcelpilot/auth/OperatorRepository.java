package com.parcelpilot.auth;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class OperatorRepository {

    /** One row of the operators table. Holds the HASH, never the password. */
    public record Operator(String username, String passwordHash, String role) {}

    private final JdbcTemplate jdbc;

    public OperatorRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public Optional<Operator> findByUsername(String username) {
        return jdbc.query(
                "SELECT username, password_hash, role FROM operators WHERE username = ?",
                (row, n) -> new Operator(row.getString("username"), row.getString("password_hash"), row.getString("role")),
                username
        ).stream().findFirst();
    }
}
