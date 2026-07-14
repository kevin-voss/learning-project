# Security troubleshooting: symptom → cause → fix

Companion to [Step 16](README.md). Spring Security fails *closed*: when something is misconfigured, you don't get a stack trace — you get a blank `401`/`403` and no explanation. This page is the field guide for every wall you're likely to hit during the build. Also useful: [When things break](../../references/when-things-break.md) for the general debugging method, and [the authentication reference](../../references/authentication.md) for the concepts.

## First: is it a 401 or a 403?

They look alike and mean opposite things. Check the status line before anything else:

| Status | Means | So the problem is in… |
|---|---|---|
| `401 Unauthorized` | "I don't know who you are" — no/invalid/expired token | the **token** or how you're sending it |
| `403 Forbidden` | "I know who you are, and no" — authenticated, not allowed | **roles/authorities** (see [authz-vs-authn-lab.md](authz-vs-authn-lab.md)) |

## Everything suddenly returns 401/403 (right after adding the dependency)

| Symptom | Cause | Fix |
|---|---|---|
| Every endpoint — even `GET /parcels` that worked five minutes ago — now returns `401` | **This is expected, not a bug.** The moment `spring-boot-starter-security` is on the classpath, Spring Security locks down **every** endpoint by default. Secure-by-default is the whole point: nothing is public until you say so. | Build the `SecurityFilterChain` from the README that explicitly permits what should be public and protects the rest. Don't "fix" it by removing the dependency or permitting everything. |
| Console prints `Using generated security password: …` at startup | Same default lock-down — Spring generated a throwaway user because you haven't configured your own auth yet. | Goes away once your security config and seeded operator are in place. |

## 401 on the login endpoint itself

| Symptom | Cause | Fix |
|---|---|---|
| `POST /auth/login` with perfectly good credentials returns `401` before your code even runs | The filter chain protects `/auth/login` too — but login is *how you get a token*. A client can't authenticate to reach the authentication endpoint. Chicken, meet egg. | Check the matcher in your `SecurityFilterChain`: `/auth/login` must be in the `permitAll()` list. Watch for typos — `/auth/login` vs `/auth/login/` vs `/login` must match what the controller actually maps. |

## Token works in curl but 401 from a script

| Symptom | Cause | Fix |
|---|---|---|
| Copy-pasting the token into curl works; your script gets `401` | Missing the `Bearer ` prefix: the header must be `Authorization: Bearer <token>`, with exactly one space. `Authorization: <token>` alone is silently ignored. | Print the exact header your script sends and compare character by character. |
| Same, but the prefix looks right | Shell quoting/whitespace: `$TOKEN` was captured with a trailing newline or quotes (e.g. `jq .accessToken` instead of `jq -r .accessToken` leaves literal `"` around it). | Capture with `-r`: `TOKEN=$(curl -s ... | jq -r .accessToken)`, then sanity-check with `echo "[$TOKEN]"` — no quotes or spaces inside the brackets. |

## Expired token

| Symptom | Cause | Fix |
|---|---|---|
| A token that worked earlier now returns `401` | Tokens are deliberately short-lived; the `exp` claim has passed. Also possible: your machine's clock disagrees with the container's. | Log in again for a fresh token. To *see* the expiry, decode the payload yourself (a JWT is three base64url parts joined by dots — the middle one is readable JSON): |

```bash
echo "$TOKEN" | cut -d. -f2 | base64 -d 2>/dev/null | jq
```

```json
{ "sub": "operator", "role": "OPERATOR", "iat": 1784140800, "exp": 1784141700 }
```

Careful with padding: base64url payloads aren't always a multiple of 4 characters, so `base64 -d` may complain or truncate. If the output looks cut off, append `==` before decoding (`echo "$PART==" | base64 -d`). Compare `exp` (seconds since 1970) with `date +%s` — if `exp` is in the past, that's your answer. Decoding this proves something else too: **JWT contents are readable by anyone holding the token** — which is why no secrets go in claims.

## Signature invalid

| Symptom | Cause | Fix |
|---|---|---|
| Tokens stop working after every service restart | The signing secret is generated randomly at startup, so each restart signs with a new key — every old token's signature no longer verifies. | Configure a fixed secret via an environment variable (see [configuration.md](../../references/configuration.md)); the same key must verify that signed. |
| Startup or signing fails with a key-length error (`The specified key byte array is 128 bits which is not secure enough…`) | HS256 requires a key of at least 256 bits (32 bytes). Your secret is too short. | Use a longer secret — at least 32 characters for a local dev value. |
| `401` and the log says signature verification failed | Different secret between the service that signed and the code that verifies (common after editing config in one place but not the other, or a stale container built with old config). | Rebuild/restart so everything reads the same secret; confirm with the debug logging below. |

## 403 with a valid token

| Symptom | Cause | Fix |
|---|---|---|
| Fresh token, correct header, still `403` | You are authenticated but not **authorized**: the token's role claim doesn't satisfy the endpoint's rule. Classic trap: the `ROLE_` prefix — `hasRole("OPERATOR")` checks for authority `ROLE_OPERATOR`, so a token carrying plain `OPERATOR` fails. | Decode the token (trick above) and compare the role claim against the check, prefix included. Full walkthrough: [authz-vs-authn-lab.md](authz-vs-authn-lab.md). |

## CSRF surprise on POST

| Symptom | Cause | Fix |
|---|---|---|
| Every `POST`/`PATCH` returns `403` even though `GET`s work and you haven't protected anything yet | Spring Security's **CSRF protection** is on by default and rejects state-changing requests without a CSRF token. | Disable it in the filter chain (`csrf(csrf -> csrf.disable())`) — for **this API** that's correct, not a shortcut. Here's the honest paragraph: |

CSRF (cross-site request forgery) attacks work by making a victim's *browser* silently send a request that rides on cookies the browser attaches automatically. The defense (a per-session token the attacker can't read) exists to protect **cookie-based browser sessions**. ParcelPilot's API is **stateless**: no sessions, no cookies — every request must explicitly present a Bearer token in a header, and a forged cross-site request has no way to add that header. There is nothing for CSRF protection to protect, and leaving it on only breaks your own clients. If ParcelPilot ever added cookie-based login for a browser UI, this decision would need revisiting — that's the honest caveat.

## Turn on the X-ray: Spring Security debug logging

When none of the tables match, stop guessing and watch the filter chain decide. In `application.properties`:

```properties
logging.level.org.springframework.security=DEBUG
```

Restart, repeat the failing request, and read the story: which filter matched, whether a token was found, how it was parsed, and exactly why the request was rejected (`Invalid signature`, `Jwt expired at …`, `Access is denied`). This is the step-07 lesson paying off — [levels let frameworks stay quiet until you need them](../07-logging-and-observability-basics/README.md). Turn it back off when you're done; it's noisy, and security logs at DEBUG can include token details you don't want lying around.

## Next

- The 401-vs-403 distinction, hands-on: [authz-vs-authn-lab.md](authz-vs-authn-lab.md)
- Concepts: [Password authentication and JWT](../../references/authentication.md)
- General debugging method: [When things break](../../references/when-things-break.md)
- Back to the step: [Step 16 README](README.md)
