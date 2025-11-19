// src/components/Weather.js
"use client";
import { useState, useEffect } from "react";

export default function Weather({ cities = [] }) {
  const [data, setData] = useState([]);
  const apiKey = import.meta.env.PUBLIC_WEATHER_API_KEY; // .env 里配置你的 API key
  const apiBase = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    async function fetchWeather() {
      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const res = await fetch(`${apiBase}?q=${city}&units=metric&appid=${apiKey}`);
            if (!res.ok) throw new Error(`Failed to fetch ${city}`);
            const json = await res.json();
            return {
              city,
              temp: json.main.temp,
              weather: json.weather[0].description,
            };
          } catch (err) {
            console.error(err);
            return { city, temp: "-", weather: "获取失败" };
          }
        })
      );
      setData(results);
    }

    fetchWeather();
  }, [cities]);

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {data.map((item) => (
        <div
          key={item.city}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            minWidth: "120px",
            textAlign: "center",
          }}
        >
          <h3>{item.city}</h3>
          <p>{item.temp} °C</p>
          <p>{item.weather}</p>
        </div>
      ))}
    </div>
  );
}