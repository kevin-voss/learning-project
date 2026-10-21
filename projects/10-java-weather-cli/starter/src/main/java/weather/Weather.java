package weather;

// The weather right now: temperature in °C and wind speed in km/h.
public class Weather {

    private final double temperature;
    private final double windSpeed;

    public Weather(double temperature, double windSpeed) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
    }

    public double getTemperature() {
        return temperature;
    }

    public double getWindSpeed() {
        return windSpeed;
    }
}
