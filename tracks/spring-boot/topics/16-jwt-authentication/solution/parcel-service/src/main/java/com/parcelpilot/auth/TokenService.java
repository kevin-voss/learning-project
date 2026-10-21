package com.parcelpilot.auth;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

/** Prints the visitor badge: a signed JWT that says who you are and your role. */
@Service
public class TokenService {

    public static final Duration LIFETIME = Duration.ofMinutes(15);   // short-lived on purpose

    private final JwtEncoder encoder;

    public TokenService(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    public String issue(String username, String role) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("parcelpilot")
                .subject(username)                 // who
                .claim("role", role)               // what they may do (from the DATABASE, never the request)
                .issuedAt(now)
                .expiresAt(now.plus(LIFETIME))     // when the badge stops working
                .build();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
