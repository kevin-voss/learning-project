package weather;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

// Talks to Open-Meteo: first "where is this city?", then "how warm is it there?".
public class WeatherClient {

    private static final String GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search?count=1&name=";
    private static final String FORECAST_URL = "https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m";

    private final HttpClient http = HttpClient.newHttpClient();
    private static final ObjectMapper JSON = new ObjectMapper();

    // City name -> place. "New York" becomes "New+York" in the URL.
    public Place findPlace(String city) throws IOException, InterruptedException {
        String url = GEOCODING_URL + URLEncoder.encode(city, StandardCharsets.UTF_8);
        return parsePlace(get(url), city);
    }

    // Place -> the current weather there.
    public Weather currentWeather(Place place) throws IOException, InterruptedException {
        // TODO step 5: build the forecast URL with "&latitude=" and "&longitude=" of the place,
        //   then return parseWeather(get(url)).
        return new Weather(0, 0);
    }

    // One GET request. Anything but status 200 is an error.
    private String get(String url) throws IOException, InterruptedException {
        // TODO step 2: build an HttpRequest for the URL with GET().
        //   Send it with http.send(request, HttpResponse.BodyHandlers.ofString()).
        //   If statusCode() is not 200, throw new IOException("Open-Meteo answered with status " + ...).
        //   Return the body().
        return "{}";
    }

    // {"results":[{"name":"Berlin","country":"Germany","latitude":52.52,"longitude":13.41}]}
    // No "results" means the city was not found.
    static Place parsePlace(String json, String city) throws IOException {
        // TODO step 3: JsonNode results = JSON.readTree(json).path("results");
        //   Empty results: throw new IllegalArgumentException("No place called ... was found.")
        //   Otherwise read name, country, latitude and longitude of results.get(0).
        return new Place(city, "?", 0, 0);
    }

    // {"current":{"temperature_2m":13.3,"wind_speed_10m":7.9}}
    static Weather parseWeather(String json) throws IOException {
        // TODO step 4: read "current", then its "temperature_2m" and "wind_speed_10m".
        return new Weather(0, 0);
    }
}
