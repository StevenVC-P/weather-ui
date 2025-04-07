// Base template for all weather cards with rustic aesthetic
import React from 'react';

export default function WeatherCardTemplate({ 
  title, 
  value, 
  unit, 
  icon, 
  color, 
  trendData = null, // { symbol, value, unit, sparklineData, sparklineField, sparklineColor, height, width }
  statusInfo = null, // { label, indicator }
  additionalInfo = null, // Any additional component to render
  children 
}) {
  // Map modern colors to rustic palette with Tailwind compatible classes
  const colorMap = {
    red: {
      bg: "bg-amber-50",
      darkBg: "dark:bg-stone-800",
      border: "border-amber-300",
      darkBorder: "dark:border-amber-800",
      text: "text-amber-700",
      darkText: "dark:text-amber-400",
      iconBg: "bg-amber-100",
      darkIconBg: "dark:bg-stone-800"
    },
    blue: {
      bg: "bg-teal-50",
      darkBg: "dark:bg-stone-800",
      border: "border-teal-300",
      darkBorder: "dark:border-teal-800",
      text: "text-teal-700",
      darkText: "dark:text-teal-400",
      iconBg: "bg-teal-100",
      darkIconBg: "dark:bg-stone-800"
    },
    green: {
      bg: "bg-emerald-50",
      darkBg: "dark:bg-stone-800",
      border: "border-emerald-300",
      darkBorder: "dark:border-emerald-800",
      text: "text-emerald-700",
      darkText: "dark:text-emerald-400",
      iconBg: "bg-emerald-100",
      darkIconBg: "dark:bg-stone-800"
    },
    yellow: {
      bg: "bg-amber-50",
      darkBg: "dark:bg-stone-800",
      border: "border-amber-300",
      darkBorder: "dark:border-amber-800",
      text: "text-amber-700",
      darkText: "dark:text-amber-400",
      iconBg: "bg-amber-100",
      darkIconBg: "dark:bg-stone-800"
    }
  };
  
  const theme = colorMap[color] || colorMap.red;
  
  return (
    <div className={`${theme.bg} ${theme.darkBg} rounded-2xl shadow-lg p-6 border ${theme.border} ${theme.darkBorder} transition-all duration-300 hover:shadow-xl`}>
      {/* Card header with icon */}
      <div className="flex items-center mb-5 pb-3 border-b border-stone-200 dark:border-stone-700">
        <div className={`p-2 rounded-lg ${theme.iconBg} ${theme.darkIconBg} mr-3`}>
          <span className={`${theme.text} ${theme.darkText}`}>{icon}</span>
        </div>
        <h2 className="text-xl font-serif text-stone-800 dark:text-stone-200">{title}</h2>
      </div>
      
      {/* Main value display */}
      <div className="space-y-3">
        <div className="flex items-baseline">
          <span className="text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            {value}
          </span>
          <span className="text-2xl ml-1 text-stone-600 dark:text-stone-400">{unit}</span>
        </div>
        
        {/* Trend data if provided */}
        {trendData && (
          <div className="mt-4 text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-300">
                {trendData.symbol}
                {trendData.value && `${trendData.value}${trendData.unit || ''}`}
              </span>
              {trendData.sparklineData && (
                <Sparkline 
                  data={trendData.sparklineData} 
                  field={trendData.sparklineField} 
                  color={trendData.sparklineColor} 
                  height={trendData.height || 6} 
                  width={trendData.width || 48} 
                />
              )}
            </div>
          </div>
        )}
        
        {/* Status information if provided */}
        {statusInfo && (
          <div className="mt-3 text-sm flex items-center text-stone-500 dark:text-stone-400">
            {statusInfo.label} {statusInfo.indicator}
          </div>
        )}
        
        {/* Additional information */}
        {additionalInfo}
        
        {/* Any other custom content */}
        {children}
      </div>
    </div>
  );
}

// Import the Sparkline component
import { Sparkline } from './Sparkline'; 