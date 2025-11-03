import React, { createContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export const ConfirmationContext = createContext(undefined);

const DEFAULT_STATE = {
  isOpen: false,
  messageKey: '',
  onConfirm: () => {},
};

export function ConfirmationProvider({ children }) {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState(DEFAULT_STATE);
  const confirm = useCallback((messageKey, onConfirmAction) => {
    setModalState({
      isOpen: true,
      messageKey: messageKey,
      onConfirm: onConfirmAction,
    });
  }, []);

  const handleClose = () => {
    setModalState(DEFAULT_STATE);
  };

  const handleConfirm = () => {
    modalState.onConfirm();
    handleClose();
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      
      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <div className="text-center">
          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('confirmTitle')}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t(modalState.messageKey)}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="danger" onClick={handleConfirm}>
              {t('confirmButtonConfirm')}
            </Button>
            <Button variant="primary" onClick={handleClose}>
              {t('confirmButtonCancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </ConfirmationContext.Provider>
  );
}