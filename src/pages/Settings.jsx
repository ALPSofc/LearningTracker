import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../hooks/useData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useConfirmation } from '../hooks/useConfirmation';
import toast from 'react-hot-toast';

export default function Settings() {
  const { t } = useTranslation();
  const { userName, updateUserName, resetProgress } = useData();
  const { confirm } = useConfirmation();
  
  const [localName, setLocalName] = useState(userName);

  useEffect(() => {
    setLocalName(userName);
  }, [userName]);

  const handleNameSave = (e) => {
    e.preventDefault();
    if (localName.trim()) {
      updateUserName(localName.trim());
      
      toast.success(t('settingsProfileSuccess'));
    }
  };

  const handleReset = () => {
    confirm(
      'confirmResetAll', 
      () => resetProgress() 
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card titleKey="settingsProfileTitle">
        <form onSubmit={handleNameSave} className="space-y-4">
          <div>
            <label 
              htmlFor="userName" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('settingsProfileLabel')}
            </label>
            <input
              type="text"
              id="userName"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" variant="primary">
            {t('settingsProfileButton')}
          </Button>
        </form>
        
      </Card>

      <Card titleKey="settingsDangerTitle" danger={true}>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('settingsDangerText')}
        </p>
        <Button
          onClick={handleReset}
          variant="danger"
        >
          {t('settingsDangerButton')}
        </Button>
      </Card>
    </div>
  );
}