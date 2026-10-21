# Spring testing cheat sheet

One page to look things up. The lessons are elsewhere: first JUnit tests in the Java hub ([Testing](../../../java/topics/testing/index.html)), Spring tests in [Step 08](../../topics/08-testing/README.md) with its [MockMvc lab](../../topics/08-testing/mockmvc-lab.md) and [Testcontainers lab](../../topics/08-testing/testcontainers-lab.md).

## Which annotation?

| You want to test… | Use | Loads | Speed |
|---|---|---|---|
| A rule in one class | plain JUnit, no Spring | nothing | milliseconds |
| Status codes, JSON, validation, error handler | `@WebMvcTest(ParcelController.class)` | controller, advice, validation, JSON, `MockMvc` | ~1–2 s |
| Repository queries on real PostgreSQL | `@DataJpaTest` + Testcontainers + `@AutoConfigureTestDatabase(replace = Replace.NONE)` | entities, repositories, database | a few s |
| "Does the whole app start?" | `@SpringBootTest` | everything | slowest: use rarely |

Write each test at the **lowest** level that can catch the bug.

## MockMvc

```java
mockMvc.perform(post("/parcels")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":\"P-1\",\"recipient\":\"\"}"))
        .andDo(print())                                   // dump request + response
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.details.recipient").isNotEmpty());
```

## Missing bean in a slice: `@MockBean`

From step 10 the controller needs a `ParcelRepository`, which `@WebMvcTest` does not create:

```java
@MockBean
private ParcelRepository repository;

when(repository.findById("nope")).thenReturn(Optional.empty());   // script the fake
verify(repository).save(any(ParcelEntity.class));                 // was it called?
```

Mock what is **slow, external or not yet built**. Never mock the thing the test claims to check. A tiny hand-written fake (like the `FixedClock` from step 02) is often clearer than Mockito.

## One test, many inputs

```java
@ParameterizedTest
@ValueSource(strings = {"", "   "})
void createParcel_withBlankId_isRejected(String badId) {
    assertThrows(IllegalArgumentException.class, () -> new Parcel(badId, "Ava"));
}
```

## Names

`method_condition_expectedOutcome`, for example `getParcel_thatDoesNotExist_returns404WithErrorResponse`. Keep given → when → then visible inside. One "when" per test.

## Flaky tests

| Cause | Fix |
|---|---|
| Real time (`Instant.now()`) | Inject a `Clock`, use a fixed fake |
| Test B needs test A's data | Each test creates its own data |
| Two tests share parcel id `P-1` | Unique ids per test |
| `Thread.sleep(500)` | Wait for a condition with a timeout (e.g. Awaitility) |
| Needs a local database or fixed port | Testcontainers, random ports |

Fix or delete a flaky test the same day.

## Do not test

- The framework (Spring routing, JSON parsing).
- Getters, setters, record accessors.
- Private methods directly: test the public behaviour.
- The same fact at every level: the transition table is unit-tested; the HTTP layer needs one `409` test.
