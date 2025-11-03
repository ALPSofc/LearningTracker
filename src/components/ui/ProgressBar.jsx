import React from 'react';

export default function ProgressBar({ percentage, height = 'h-3' }) {
  
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height} overflow-hidden`}>
      <div 
        className={`bg-blue-600 ${height} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${clampedPercentage}%` }}
      >
      </div>
    </div>
  );
}