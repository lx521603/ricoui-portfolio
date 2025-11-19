import { useEffect, useState } from "react";

export default function Weather({ cities, apiKey }) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchWeather() {
      const results = {};
      for (let city of cities) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          );
          const json = await res.json();
          results[city] = json;
        } catch (err) {
          results[city] = { error: true };
        }
      }
      setData(results);
    }

    fetchWeather();
  }, [cities, apiKey]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cities.map((city) => {
        const cityData = data[city];
        if (!cityData) return <div key={city}>加载中 {city}...</div>;
        if (cityData.error || cityData.cod !== 200)
          return <div key={city}>无法获取 {city} 天气</div>;

        return (
          <div key={city} className="p-4 bg-white dark:bg-dark rounded shadow text-center">
            <h3 className="font-bold text-lg">{city}</h3>
            <p>温度: {cityData.main.temp}°C</p>
            <p>天气: {cityData.weather[0].description}</p>
            <p>湿度: {cityData.main.humidity}%</p>
          </div>
        );
      })}
    </div>
  );
}