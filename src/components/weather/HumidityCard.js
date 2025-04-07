import WeatherCardTemplate from "./WeatherCardTemplate";

export default function HumidityCard({ humidity, history, trend }) {
  // Humidity icon
  const icon = (
    <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );

  // Trend data
  const trendSymbol = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  const trendChange = history.length > 1 ? Math.abs((history[0]?.humidity - history[history.length - 1]?.humidity).toFixed(1)) : "";

  // Status info
  const isHighHumidity = humidity > 60;
  const statusInfo = {
    label: isHighHumidity ? "High humidity" : "Normal humidity",
    indicator: <span className={`ml-1 w-2 h-2 rounded-full ${isHighHumidity ? "bg-teal-500" : "bg-emerald-500"} inline-block`} />,
  };

  return (
    <WeatherCardTemplate
      title="Humidity"
      value={humidity}
      unit="%"
      icon={icon}
      color="blue"
      trendData={{
        symbol: trendSymbol,
        value: trendChange,
        unit: "%",
        sparklineData: history,
        sparklineField: "humidity",
        sparklineColor: "#0f766e", // teal-700
        height: 6,
        width: 48,
      }}
      statusInfo={statusInfo}
    />
  );
}
