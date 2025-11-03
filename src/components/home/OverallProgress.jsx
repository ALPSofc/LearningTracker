import React from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

export default function OverallProgress() {
  const { overallProgress, xp, streak } = useData(); 
  const { t } = useTranslation();

  return (
    <Card titleKey="homeProgressTitle">
      
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <span>{t('overallProgressLabel')}</span>
          <span className="font-bold text-blue-500">{overallProgress}%</span>
        </div>
        <ProgressBar percentage={overallProgress} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('totalXpLabel')}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {xp}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('streakLabel')}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {streak}
          </p>
        </div>
      </div>
    </Card>
  );
}