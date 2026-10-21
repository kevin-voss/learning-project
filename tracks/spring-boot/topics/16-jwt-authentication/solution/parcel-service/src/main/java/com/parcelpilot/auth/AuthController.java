package com.parcelpilot.auth;

import com.parcelpilot.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}

    public record LoginResponse(String accessToken, String tokenType, long expiresInSeconds) {}

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final OperatorRepository operators;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokens;

    public AuthController(OperatorRepository operators, PasswordEncoder passwordEncoder, TokenService tokens) {
        this.operators = operators;
        this.passwordEncoder = passwordEncoder;
        this.tokens = tokens;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest http) {
        Optional<OperatorRepository.Operator> operator = operators.findByUsername(request.username());

        // matches() hashes the typed password with the stored salt and compares the hashes
        if (operator.isEmpty() || !passwordEncoder.matches(request.password(), operator.get().passwordHash())) {
            log.info("Failed login for user {}", request.username());   // never log the password
            // same answer for "unknown user" and "wrong password": do not help attackers guess names
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(
                    "BAD_CREDENTIALS", "Wrong username or password", Map.of(), http.getRequestURI()));
        }

        String token = tokens.issue(operator.get().username(), operator.get().role());
        log.info("User {} logged in", operator.get().username());
        return ResponseEntity.ok(new LoginResponse(token, "Bearer", TokenService.LIFETIME.toSeconds()));
    }
}
