// Completely redesigned Weather Card with homestead aesthetic
export default function WeatherCard({ title, value, unit, icon, color, children }) {
  // Map modern colors to homestead palette
  const colorMap = {
    red: "amber",
    blue: "teal",
    green: "emerald",
    yellow: "amber"
  };
  
  const homesteadColor = colorMap[color] || "amber";
  
  return (
    <div className={`bg-stone-100 dark:bg-stone-800 rounded-xl shadow-md p-6 border border-${homesteadColor}-200 dark:border-${homesteadColor}-900 transition-all duration-300 hover:shadow-lg`}>
      {/* Larger, more prominent header with icon aligned */}
      <div className="flex items-center mb-5 pb-3 border-b border-stone-200 dark:border-stone-700">
        <div className={`p-2 rounded-lg bg-${homesteadColor}-100 dark:bg-${homesteadColor}-900/30 mr-3`}>
          <span className={`text-${homesteadColor}-700 dark:text-${homesteadColor}-400`}>{icon}</span>
        </div>
        <h2 className="text-xl font-serif text-stone-700 dark:text-stone-300">{title}</h2>
      </div>
      
      {/* Larger value display */}
      <div className="space-y-3">
        <div className="flex items-baseline">
          <span className="text-5xl font-serif font-bold text-stone-800 dark:text-stone-100 tracking-tight">
            {value}
          </span>
          <span className="text-2xl ml-1 text-stone-600 dark:text-stone-400">{unit}</span>
        </div>
        {children}
      </div>
    </div>
  );
} 