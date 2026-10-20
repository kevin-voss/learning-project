# Pokédex backend

Spring Boot REST API reading from PostgreSQL.

## Run

Start [PostgreSQL](../db/) first, then:

```bash
./mvnw spring-boot:run
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/pokemon?offset=0&limit=20` | Paginated list |
| GET | `/api/pokemon/{idOrName}` | Detail by id or name |

## Config

[`src/main/resources/application.yml`](src/main/resources/application.yml) — JDBC URL and credentials match `db/.env.example`.

## Tests

```bash
./mvnw test
```
