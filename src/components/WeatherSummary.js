import { getWeatherFromCode, convertToFahrenheit } from "../weatherConstant";

const WeatherSummary = ({
  currentWeather: { temperature, weatherCode },
  isCelsius,
}) => {
  const weatherType = getWeatherFromCode(weatherCode);

  return (
    <div>
      <h1>
        {isCelsius
          ? `${temperature} ºC`
          : `${convertToFahrenheit(temperature)} ºF`}{" "}
        | {weatherType}
      </h1>
    </div>
  );
};

export default WeatherSummary;
