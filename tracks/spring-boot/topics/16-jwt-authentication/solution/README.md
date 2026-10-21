# Step 16 solution: login and JWT

These are the files that are **new or changed** in step 16. Paths are relative to `applications/parcelpilot-services/`. notification-service does not change. Try the step on your own first, then compare.

| File | What changed |
|---|---|
| [compose.yaml](compose.yaml) | parcel-service gets `JWT_SECRET` (a local-only value) |

## parcel-service

| File | What changed |
|---|---|
| [pom.xml](parcel-service/pom.xml) | `spring-boot-starter-security`, `spring-boot-starter-oauth2-resource-server`, test: `spring-security-test` |
| [application.properties](parcel-service/src/main/resources/application.properties) | `parcelpilot.jwt.secret` from `JWT_SECRET` |
| [V4__create_operators.sql](parcel-service/src/main/resources/db/migration/V4__create_operators.sql) | **new**: `operators` table with two practice users (bcrypt hashes of `local-password`) |
| [SecurityConfig.java](parcel-service/src/main/java/com/parcelpilot/auth/SecurityConfig.java) | **new**: door rules, JWT encoder and decoder, role mapping, bcrypt |
| [TokenService.java](parcel-service/src/main/java/com/parcelpilot/auth/TokenService.java) | **new**: issues 15-minute HS256 tokens with `sub` and `role` |
| [AuthController.java](parcel-service/src/main/java/com/parcelpilot/auth/AuthController.java) | **new**: `POST /auth/login` |
| [OperatorRepository.java](parcel-service/src/main/java/com/parcelpilot/auth/OperatorRepository.java) | **new**: reads one operator by username |
| [AuthFlowTest.java](parcel-service/src/test/java/com/parcelpilot/AuthFlowTest.java) | **new**: `401`, `403` and `200` with real tokens |
| [ParcelCacheAndLockTest.java](parcel-service/src/test/java/com/parcelpilot/ParcelCacheAndLockTest.java) | its `POST` and `PATCH` requests carry a test badge: `.with(jwt()...)` |

## Check that it works

```bash
cd applications/parcelpilot-services/parcel-service
mvn test
```

Back to [step 16](../README.md).
