import Axios from "axios";

function convertDate(date) {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}

export const getWeekWeather = async ({ latitude, longitude }) => {
  const currentDate = new Date();
  const weatherInfo = await Axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"],
        timezone: "GMT",
        start_date: convertDate(currentDate),
        end_date: convertDate(
          new Date(currentDate.setDate(currentDate.getDate() + 7))
        ),
        current_weather: true,
      },
    }
  );
  return weatherInfo.data;
};
