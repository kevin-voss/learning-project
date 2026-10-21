package com.parcelpilot;

import com.parcelpilot.parcel.Notifier;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "parcelpilot.rate-limit.per-minute=1000")
@AutoConfigureMockMvc
@Import(TestcontainersConfiguration.class)
class ParcelCacheAndLockTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    CacheManager cacheManager;

    @MockBean
    Notifier notifier;   // no RabbitMQ needed for this test

    // step 16: changing parcels needs an operator badge. jwt() fakes a valid one for tests.
    private static JwtRequestPostProcessor operatorBadge() {
        return jwt().authorities(new SimpleGrantedAuthority("ROLE_OPERATOR"));
    }

    @Test
    void readFillsTheCache_andAChangeEmptiesIt() throws Exception {
        create("P-C1");

        mvc.perform(get("/parcels/P-C1")).andExpect(status().isOk());
        assertThat(cacheManager.getCache("parcels").get("P-C1")).isNotNull();   // sticky note written

        changeStatus("P-C1", "PICKED_UP", 0).andExpect(status().isOk());
        assertThat(cacheManager.getCache("parcels").get("P-C1")).isNull();      // sticky note torn off

        mvc.perform(get("/parcels/P-C1"))
                .andExpect(jsonPath("$.status").value("PICKED_UP"))             // fresh, not stale
                .andExpect(jsonPath("$.version").value(1));
    }

    @Test
    void updateWithAnOldVersion_gets409() throws Exception {
        create("P-C2");
        changeStatus("P-C2", "PICKED_UP", 0).andExpect(status().isOk());       // version 0 -> 1

        changeStatus("P-C2", "DELIVERED", 0)                                    // still thinks it is 0
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("VERSION_CONFLICT"));
    }

    private void create(String id) throws Exception {
        mvc.perform(post("/parcels").with(operatorBadge()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"" + id + "\",\"recipient\":\"Ava\"}"))
                .andExpect(status().isCreated());
    }

    private org.springframework.test.web.servlet.ResultActions changeStatus(String id, String status, long version)
            throws Exception {
        return mvc.perform(patch("/parcels/" + id + "/status").with(operatorBadge()).contentType(MediaType.APPLICATION_JSON)
                .content("{\"status\":\"" + status + "\",\"version\":" + version + "}"));
    }
}
