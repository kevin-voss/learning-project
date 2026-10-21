package weather;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import org.junit.jupiter.api.Test;

// These tests use saved answers, so they need no internet and are always the same.
// They fail until you finish the TODOs in WeatherClient.java. Run them with: mvn test
class WeatherClientTest {

    private static final String BERLIN = """
            {"results":[{"id":2950159,"name":"Berlin","latitude":52.52437,"longitude":13.41053,
            "country_code":"DE","country":"Germany"}],"generationtime_ms":0.1}
            """;

    private static final String FORECAST = """
            {"latitude":52.5,"longitude":13.4,"current_units":{"temperature_2m":"°C"},
            "current":{"time":"2026-10-21T12:00","interval":900,"temperature_2m":13.3,"wind_speed_10m":7.9}}
            """;

    @Test
    void parsePlaceReadsNameCountryAndCoordinates() throws IOException {
        Place place = WeatherClient.parsePlace(BERLIN, "Berlin");

        assertEquals("Berlin", place.getName());
        assertEquals("Germany", place.getCountry());
        assertEquals(52.52437, place.getLatitude());
        assertEquals(13.41053, place.getLongitude());
    }

    @Test
    void unknownCityIsAClearError() {
        String nothingFound = "{\"generationtime_ms\":0.1}";

        assertThrows(IllegalArgumentException.class, () -> WeatherClient.parsePlace(nothingFound, "Qwxyz"));
    }

    @Test
    void parseWeatherReadsTemperatureAndWind() throws IOException {
        Weather weather = WeatherClient.parseWeather(FORECAST);

        assertEquals(13.3, weather.getTemperature());
        assertEquals(7.9, weather.getWindSpeed());
    }
}
