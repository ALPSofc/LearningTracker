import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import GoalModal from './GoalModal';

import { useConfirmation } from '../../hooks/useConfirmation';

export default function TrackCard({ track }) {
  
  if (!track || !track.goals) {
    return null; 
  }

  const { deleteTrack, editTrackTitle } = useData();
  const { t } = useTranslation();
  
  const { confirm } = useConfirmation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(track.name); 

  const handleEditTrack = () => {
    editTrackTitle(track.id, newTitle.trim());
    setIsEditingTitle(false);
  };

  const handleDeleteTrack = () => {
    confirm(
      'confirmDeleteTrack',
      () => deleteTrack(track.id)
    );
  };

  const doneCount = track.goals.filter(g => g.done).length;
  const totalCount = track.goals.length;

  return (
    <>
      <Card className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          {isEditingTitle ? (
            <form onSubmit={(e) => { e.preventDefault(); handleEditTrack(); }} className="flex-grow">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="text-xl font-bold bg-transparent border-b-2 border-blue-500 
                           dark:border-blue-400 focus:outline-none w-full 
                           text-gray-900 dark:text-white"
                autoFocus
                onBlur={handleEditTrack}
              />
            </form>
          ) : (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white break-all">
              {track.name}
            </h3>
          )}

          <div className="flex-shrink-0 flex gap-1 ml-2">
            <button onClick={() => setIsEditingTitle(true)} className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700" title={t('trackCardEditTitle')}>
              <FaEdit />
            </button>
            <button 
              onClick={handleDeleteTrack}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700" 
              title={t('trackCardDeleteTitle')}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <div className="flex-grow">
          <div className="mb-2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400 mb-1">
              {t('trackCardProgress', { progress: track.progress })}
            </p>
            <ProgressBar percentage={track.progress} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('trackCardGoalsCount', { done: doneCount, total: totalCount })}
          </p>
        </div>

        <div className="mt-6">
          <Button 
            variant="primary" 
            size="base"
            onClick={() => setIsModalOpen(true)}
            className="w-full"
          >
            {t('trackCardButton')}
          </Button>
        </div>
      </Card>

      <GoalModal 
        track={track} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}