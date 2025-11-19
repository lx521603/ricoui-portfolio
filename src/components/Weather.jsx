// Weather.jsx
import { useState, useEffect } from "react";

export default function Weather({ cities = [] }) {
  const [data, setData] = useState({});

  useEffect(() => {
    cities.forEach(async (city) => {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      const json = await res.json();
      setData((prev) => ({ ...prev, [city]: json }));
    });
  }, [cities]);

  return (
    <div className="w-full flex flex-col gap-4">
      {cities.map((city) => {
        const weather = data[city];
        if (!weather) return <div key={city}>加载中... {city}</div>;

        const tempC = weather.current_condition?.[0]?.temp_C || "—";
        const desc = weather.current_condition?.[0]?.weatherDesc?.[0]?.value || "";

        return (
          <div key={city} className="p-4 border rounded-md shadow-sm bg-white dark:bg-dark">
            <h3 className="text-lg font-semibold">{city}</h3>
            <p>{desc}</p>
            <p>{tempC}°C</p>
          </div>
        );
      })}
    </div>
  );
}