import { useContext } from 'react';
import { ConfirmationContext } from '../contexts/ConfirmationContext';

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error('useConfirmation deve ser usado dentro de um ConfirmationProvider');
  }
  return context;
};