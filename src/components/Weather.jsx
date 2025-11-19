import { useState, useEffect } from "react";

/** @typedef {{ cities?: string[] }} WeatherProps */

/** @param {WeatherProps} props */
export default function Weather({ cities = [] }) {
  const [data, setData] = useState({}); // { 城市: { temp, desc } }

  useEffect(() => {
    cities.forEach(async (city) => {
      try {
        // wttr.in API, 返回 JSON
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        );
        const json = await res.json();
        const current = json.current_condition?.[0];
        if (current) {
          setData((prev) => ({
            ...prev,
            [city]: {
              temp: current.temp_C,
              desc: current.weatherDesc?.[0]?.value || "",
            },
          }));
        }
      } catch (err) {
        console.error("获取天气失败", city, err);
      }
    });
  }, [cities]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {cities.map((city) => {
        const weather = data[city];
        return (
          <div
            key={city}
            className="p-4 rounded-xl shadow-md bg-white dark:bg-dark flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-semibold mb-2">{city}</h3>
            {weather ? (
              <>
                <p className="text-gray-700 dark:text-gray-200">
                  {weather.temp}°C
                </p>
                <p className="text-gray-500 dark:text-gray-400">{weather.desc}</p>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">加载中...</p>
            )}
          </div>
        );
      })}
    </div>
  );
}