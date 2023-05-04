import { getWeatherFromCode, convertToFahrenheit } from "../weatherConstant";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
  year: "2-digit",
});

const formatDate = (date) => dateFormatter.format(date);

const WeatherCard = ({
  weather: { date, maxTemperature, minTemperature, weatherCode },
  isCelsius,
}) => {
  const weatherType = getWeatherFromCode(weatherCode);

  return (
    <tr>
      <td>{formatDate(date)}</td>
      <td>
        {isCelsius
          ? `H: ${maxTemperature} ºC - L: ${minTemperature} ºC`
          : `H: ${convertToFahrenheit(
              maxTemperature
            )} ºF - L: ${convertToFahrenheit(minTemperature)} ºF`}
      </td>
      <td>{weatherType}</td>
    </tr>
  );
};

export default WeatherCard;
