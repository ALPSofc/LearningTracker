import React from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
import TrackCard from './TrackCard';

export default function TrackList() {
  const { tracks } = useData();
  const { t } = useTranslation();

  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {t('goalsEmptyState')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t('goalsEmptyStateSub')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <TrackCard 
          key={track.id} 
          track={track} 
        />
      ))}
    </div>
  );
}