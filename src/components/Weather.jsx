import { useState, useEffect } from "react";

export default function Weather({ cities }) {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "你的 API_KEY"; // 请替换为实际的 API Key

  useEffect(() => {
    async function fetchWeather() {
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(
              `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
                city
              )}&days=1&aqi=no&alerts=no`
            );
            const data = await res.json();
            return {
              city: city,
              temp: data.current.temp_c,
              maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
              minTemp: data.forecast.forecastday[0].day.mintemp_c,
              humidity: data.current.humidity,
              chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain
            };
          })
        );
        setWeatherData(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [cities]);

  if (loading) {
    return <p className="text-center text-gray-500">加载中...</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {weatherData.map((w) => (
        <div
          key={w.city}
          className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 flex flex-col w-48"
        >
          <h3 className="font-semibold mb-2">{w.city}</h3>
          <div className="flex justify-between text-sm">
            <span>当前: {w.temp}°C</span>
            <span>最高: {w.maxTemp}°C</span>
            <span>最低: {w.minTemp}°C</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>湿度: {w.humidity}%</span>
            <span>降雨: {w.chanceOfRain}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}