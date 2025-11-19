// src/components/Wearher.jsx
import { useEffect, useState } from 'react';

export default function Weather({ cities = ["昆明", "大理", "保山", "腾冲", "芒市", "景洪"] }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      const results = {};
      for (const city of cities) {
        try {
          const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
          const json = await res.json();
          results[city] = {
            temp: json.current_condition[0].temp_C,
            desc: json.current_condition[0].weatherDesc[0].value,
            icon: json.current_condition[0].weatherIconUrl[0].value
          };
        } catch (err) {
          results[city] = { error: true };
          console.error(`Weather fetch failed for ${city}`, err);
        }
      }
      setData(results);
      setLoading(false);
    }

    fetchWeather();
  }, [cities]);

  if (loading) return <div>加载中...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cities.map((city) => {
        const info = data[city];
        if (!info) return null;
        if (info.error) return <div key={city} className="p-4 bg-red-100 rounded">无法获取 {city} 的天气</div>;

        return (
          <div key={city} className="p-4 bg-gray-50 dark:bg-gray-800 rounded shadow flex items-center space-x-4">
            <img src={info.icon} alt={info.desc} className="w-12 h-12" />
            <div>
              <div className="font-bold text-lg">{city}</div>
              <div>{info.desc}</div>
              <div className="text-sm">{info.temp}°C</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}