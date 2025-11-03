import React from 'react';

export default function Badge({ children, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span 
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses[color] || colorClasses.blue}`}
    >
      {children}
    </span>
  );
}