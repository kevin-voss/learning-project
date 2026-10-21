package weather;

import java.io.IOException;

// Start: mvn -q compile exec:java -Dexec.args="Berlin"
// The city comes from the command line (args), not from a Scanner.
public class Main {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: give a city name, for example: Berlin");
            return;
        }
        String city = String.join(" ", args);   // "New York" can arrive as two words

        WeatherClient client = new WeatherClient();
        try {
            Place place = client.findPlace(city);
            Weather weather = client.currentWeather(place);
            System.out.println(place.getName() + " (" + place.getCountry() + "): "
                    + weather.getTemperature() + " °C, wind " + weather.getWindSpeed() + " km/h");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        } catch (IOException e) {
            System.out.println("Could not get the weather: " + e.getMessage());
        } catch (InterruptedException e) {
            System.out.println("Stopped while waiting for the answer.");
        }
    }
}
