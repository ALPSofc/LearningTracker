import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { useTranslation } from 'react-i18next';
import TrackList from '../components/metas/TrackList';
import Button from '../components/ui/Button';

export default function MinhasMetas() {
  const { addTrack } = useData();
  const { t } = useTranslation();
  const [newTrackName, setNewTrackName] = useState('');
  const handleAddTrack = (e) => {
    e.preventDefault(); 
    if (newTrackName.trim() === '') return; 
    addTrack(newTrackName.trim());
    setNewTrackName('');
  };

  return (
    <div className="space-y-6">
      <form 
        onSubmit={handleAddTrack} 
        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex gap-4"
      >
        <input
          type="text"
          value={newTrackName}
          onChange={(e) => setNewTrackName(e.target.value)}
          placeholder={t('goalsFormPlaceholder')}
          className="flex-grow p-3 border border-gray-300 rounded-lg 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button 
          type="submit"
          variant="success"
        >
          {t('goalsFormButton')}
        </Button>
      </form>
      <TrackList />
    </div>
  );
}