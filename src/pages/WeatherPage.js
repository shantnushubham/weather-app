import { useEffect, useState } from "react";
import { getWeekWeather } from "../api/weather";
import WeatherCard from "../components/WeatherCard";
import WeatherSummary from "../components/WeatherSummary";

const WeatherPage = () => {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const isDay = todayWeather.isDay ?? true;

  useEffect(() => {
    async function fetchWeather(latitude, longitude) {
      try {
        const weatherObj = await getWeekWeather({
          latitude,
          longitude,
        });
        convertToStateVar(weatherObj);
      } catch (error) {
        console.error(error);
      }
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const convertToStateVar = (tempWeekWeather) => {
    let fetchedWeatherInfo = [];
    for (let i = 0; i < tempWeekWeather.daily.time.length; i++) {
      fetchedWeatherInfo.push({
        date: new Date(tempWeekWeather.daily.time[i]),
        maxTemperature: tempWeekWeather.daily.temperature_2m_max[i],
        minTemperature: tempWeekWeather.daily.temperature_2m_min[i],
        weatherCode: tempWeekWeather.daily.weathercode[i],
      });
    }
    setWeekWeather(fetchedWeatherInfo);
    let currentWeather = tempWeekWeather.current_weather;
    currentWeather.time = new Date(currentWeather.time);
    currentWeather.isDay = currentWeather.is_day === 1 ? true : false;
    delete currentWeather.is_day;
    currentWeather.weatherCode = currentWeather.weathercode;
    delete currentWeather.weathercode;
    setTodayWeather(currentWeather);
  };

  return (
    <div className={isDay ? "app" : "app dark"}>
      <h1 className="ui header">Weather</h1>
      <button
        onClick={() => setIsCelsius(!isCelsius)}
        style={{ float: "right" }}
        className="ui icon button"
      >
        {isCelsius ? "ºF" : "ºC"}
      </button>
      <div>
        <WeatherSummary
          currentWeather={todayWeather}
          isCelsius={isCelsius}
          isDay={isDay}
        />
        <table
          className="ui very basic table"
          style={
            !isDay
              ? {
                  background: "black",
                  color: "white",
                }
              : {}
          }
        >
          <thead className={isDay ? `table-custom` : `table-custom dark`}>
            <tr>
              <th>Date</th>
              <th>Temp</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody className="table-custom">
            {weekWeather.map((weather) => (
              <WeatherCard
                isDay={isDay}
                weather={weather}
                isCelsius={isCelsius}
                key={weather.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherPage;
