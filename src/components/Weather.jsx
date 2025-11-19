// src/components/Weather.jsx
import { useEffect, useState } from 'react';

export default function Weather({ cities }) {
  const [weatherData, setWeatherData] = useState({});
  const apiKey = import.meta.env.PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      const data = {};
      for (const city of cities) {
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
          );
          const json = await res.json();
          data[city] = {
            current: json.current.temp_c,
            max: json.forecast.forecastday[0].day.maxtemp_c,
            min: json.forecast.forecastday[0].day.mintemp_c,
            humidity: json.current.humidity,
            chance_of_rain: json.forecast.forecastday[0].day.daily_chance_of_rain,
            condition: json.current.condition.text
          };
        } catch (err) {
          console.error(`Failed to fetch weather for ${city}`, err);
        }
      }
      setWeatherData(data);
    }

    fetchWeather();
  }, [cities]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cities.map((city) => (
        <div
          key={city}
          className="p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800"
        >
          <h3 className="text-lg font-semibold">{city}</h3>
          {weatherData[city] ? (
            <div className="mt-2 space-y-1">
              <div>当前温度: {weatherData[city].current}°C</div>
              <div>最高温: {weatherData[city].max}°C</div>
              <div>最低温: {weatherData[city].min}°C</div>
              <div>湿度: {weatherData[city].humidity}%</div>
              <div>降雨概率: {weatherData[city].chance_of_rain}%</div>
              <div>天气: {weatherData[city].condition}</div>
            </div>
          ) : (
            <div className="mt-2 text-gray-500">加载中...</div>
          )}
        </div>
      ))}
    </div>
  );
}