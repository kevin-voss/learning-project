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
        String url = FORECAST_URL + "&latitude=" + place.getLatitude() + "&longitude=" + place.getLongitude();
        return parseWeather(get(url));
    }

    // One GET request. Anything but status 200 is an error.
    private String get(String url) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(url)).GET().build();
        HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            throw new IOException("Open-Meteo answered with status " + response.statusCode());
        }
        return response.body();
    }

    // {"results":[{"name":"Berlin","country":"Germany","latitude":52.52,"longitude":13.41}]}
    // No "results" means the city was not found.
    static Place parsePlace(String json, String city) throws IOException {
        JsonNode results = JSON.readTree(json).path("results");
        if (results.isEmpty()) {
            throw new IllegalArgumentException("No place called \"" + city + "\" was found.");
        }
        JsonNode first = results.get(0);
        return new Place(
                first.path("name").asText(),
                first.path("country").asText(),
                first.path("latitude").asDouble(),
                first.path("longitude").asDouble());
    }

    // {"current":{"temperature_2m":13.3,"wind_speed_10m":7.9}}
    static Weather parseWeather(String json) throws IOException {
        JsonNode current = JSON.readTree(json).path("current");
        if (!current.has("temperature_2m")) {
            throw new IOException("The answer had no temperature in it.");
        }
        return new Weather(current.path("temperature_2m").asDouble(), current.path("wind_speed_10m").asDouble());
    }
}
