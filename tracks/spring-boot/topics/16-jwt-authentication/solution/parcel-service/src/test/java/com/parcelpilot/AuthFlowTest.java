package com.parcelpilot;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parcelpilot.parcel.Notifier;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "parcelpilot.rate-limit.per-minute=1000")
@AutoConfigureMockMvc
@Import(TestcontainersConfiguration.class)
class AuthFlowTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper json;

    @MockBean
    Notifier notifier;

    @Test
    void wrongPassword_is401() throws Exception {
        login("operator", "wrong-password")
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("BAD_CREDENTIALS"));
    }

    @Test
    void readingStaysPublic_butChangingNeedsABadge() throws Exception {
        String operator = tokenFor("operator");
        createParcel("P-S1", operator);

        mvc.perform(get("/parcels/P-S1")).andExpect(status().isOk());              // no badge: fine for reading
        pickUp("P-S1", null).andExpect(status().isUnauthorized());                  // no badge: 401
        pickUp("P-S1", "not-a-real-token").andExpect(status().isUnauthorized());    // fake badge: 401
        pickUp("P-S1", tokenFor("ava")).andExpect(status().isForbidden());          // badge, wrong role: 403
        pickUp("P-S1", operator).andExpect(status().isOk());                        // right badge: 200
    }

    private ResultActions login(String username, String password) throws Exception {
        return mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}"));
    }

    private String tokenFor(String username) throws Exception {
        String body = login(username, "local-password")
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return json.readTree(body).get("accessToken").asText();
    }

    private void createParcel(String id, String token) throws Exception {
        mvc.perform(post("/parcels").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"" + id + "\",\"recipient\":\"Ava\"}"))
                .andExpect(status().isCreated());
    }

    private ResultActions pickUp(String id, String token) throws Exception {
        var request = patch("/parcels/" + id + "/status").contentType(MediaType.APPLICATION_JSON)
                .content("{\"status\":\"PICKED_UP\"}");
        if (token != null) {
            request.header("Authorization", "Bearer " + token);
        }
        return mvc.perform(request);
    }
}
