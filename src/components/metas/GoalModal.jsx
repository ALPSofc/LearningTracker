import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';

// Importa componentes
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import GoalItem from './GoalItem';

export default function GoalModal({ track, isOpen, onClose }) {
  const { addGoalToTrack } = useData();
  const { t } = useTranslation();
  const [newGoalTitle, setNewGoalTitle] = useState('');

  if (!track) return null;

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoalTitle.trim() === '') return;
    
    addGoalToTrack(track.id, newGoalTitle.trim());
    setNewGoalTitle('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t('modalGoalsTitle', { name: track.name })}
      </h2>

      <form onSubmit={handleAddGoal} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          placeholder={t('modalGoalsFormPlaceholder')}
          className="flex-grow p-2 border border-gray-300 rounded-lg 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button type="submit" variant="success" size="sm">
          {t('modalGoalsFormButton')}
        </Button>
      </form>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {track.goals.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            {t('modalGoalsEmpty')}
          </p>
        ) : (
          track.goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              trackId={track.id} 
              goal={goal} 
            />
          ))
        )}
      </div>
    </Modal>
  );
}