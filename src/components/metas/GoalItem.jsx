import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

import { useConfirmation } from '../../hooks/useConfirmation';

export default function GoalItem({ trackId, goal }) {
  const { updateGoal, deleteGoal, editGoalTitle } = useData();
  const { t } = useTranslation();
  
  const { confirm } = useConfirmation();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(goal.title);

  const handleToggle = () => {
    updateGoal(trackId, goal.id, !goal.done);
  };

  const handleDelete = () => {
    confirm(
      'confirmDeleteGoal',
      () => deleteGoal(trackId, goal.id)
    );
  };

  const handleEdit = () => {
    if (newTitle.trim() === '') {
      setNewTitle(goal.title);
    } else {
      editGoalTitle(trackId, goal.id, newTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(goal.title);
    setIsEditing(false);
  };
  
  if (isEditing) {

    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
        />
        <button onClick={handleEdit} className="p-2 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-gray-600" title={t('modalButtonSave')}>
          <FaSave size={18} />
        </button>
        <button onClick={handleCancel} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600" title={t('modalButtonCancel')}>
          <FaTimes size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors
                    ${goal.done ? 'bg-green-100 dark:bg-green-800/50' : 'bg-gray-100 dark:bg-gray-700'}`}>
      
      <div 
        className="flex items-center flex-grow min-w-0 cursor-pointer" 
        onClick={handleToggle}
      >
        <input
          type="checkbox"
          checked={goal.done}
          onChange={handleToggle}
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
        />
        <span 
          className={`ml-3 text-gray-800 dark:text-gray-200 truncate ${goal.done ? 'line-through opacity-75' : ''}`}
          title={goal.title}
        >
          {goal.title}
        </span>
      </div>
      
      <div className="flex-shrink-0 flex items-center gap-1 ml-4">
        <button onClick={() => setIsEditing(true)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-600" title={t('modalEditTitle')}>
          <FaEdit />
        </button>
        <button 
          onClick={handleDelete}
          className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-gray-600" 
          title={t('modalDeleteTitle')}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}