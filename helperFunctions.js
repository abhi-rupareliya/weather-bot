exports.extractAndFormatWeatherData = (weatherData) => {
  const {
    name,
    coord: { lon, lat },
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    visibility,
    wind: { speed, deg },
    clouds: { all },
    sys: { country },
    dt,
    timezone,
  } = weatherData;

  const formattedString = `
      Location: ${name}
      Coordinates: Long ${lon}, Lat ${lat}
      Weather: ${weather[0].description}
      Temperature: ${convertKelvinToCelsius(temp).toFixed(2)}°C (Feels like ${convertKelvinToCelsius(feels_like).toFixed(2)}°C)
      Min Temperature: ${convertKelvinToCelsius(temp_min).toFixed(2)}°C
      Max Temperature: ${convertKelvinToCelsius(temp_max).toFixed(2)}°C
      Pressure: ${pressure} hPa
      Humidity: ${humidity}%
      Visibility: ${visibility} meters
      Wind Speed: ${speed} m/s (${convertDegreesToDirection(deg)})
      Cloudiness: ${all}%
      Country: ${country}
      Date Time: ${new Date(dt * 1000).toLocaleString("en-US", {
        timeZone: "UTC",
      })}
      Timezone: ${timezone / 3600} hours from UTC`;

  return formattedString;
};
