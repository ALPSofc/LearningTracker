import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Card({ children, titleKey, danger = false, className = '' }) {
  const { t } = useTranslation();

  const baseClasses = `bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`;
  
  const borderClasses = danger 
    ? 'border border-red-300 dark:border-red-700' 
    : '';

  return (
    <div className={`${baseClasses} ${borderClasses}`}>
      {titleKey && (
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${danger ? 'bg-red-50 dark:bg-red-900/50' : ''}`}>
          <h2 className={`text-xl font-bold ${danger ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
            {t(titleKey)}
          </h2>
        </div>
      )}

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}