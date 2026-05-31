package com.learning.pokedex.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Logs SQL for learning: backend console shows what ran against PostgreSQL.
 */
@Component
public class SqlQueryLogger {

    private static final Logger log = LoggerFactory.getLogger(SqlQueryLogger.class);

    public void log(String context, String sql) {
        log.info("[SQL:{}] {}", context, sql);
    }
}
