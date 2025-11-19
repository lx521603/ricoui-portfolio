import { useEffect, useState } from "react";

export default function WeatherCard({ city, apiKey }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, apiKey]);

  if (loading) return <div>加载中...</div>;
  if (!weather || weather.cod !== 200) return <div>无法获取 {city} 天气</div>;

  return (
    <div className="p-4 bg-white dark:bg-dark rounded shadow">
      <h3 className="font-bold text-lg">{city}</h3>
      <p>温度: {weather.main.temp}°C</p>
      <p>天气: {weather.weather[0].description}</p>
      <p>湿度: {weather.main.humidity}%</p>
    </div>
  );
}