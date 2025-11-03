import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function CookieConsent() {
  const { t } = useTranslation();
  
  const [consentGiven, setConsentGiven] = useLocalStorage('cookie_consent', false);

  const handleAccept = () => {
    setConsentGiven(true);
  };

  return (
    <AnimatePresence>
      {!consentGiven && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 
                     w-full max-w-md p-6 
                     bg-white dark:bg-slate-800 
                     rounded-lg shadow-2xl border dark:border-slate-700"
          
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {t('cookieBannerText')}
          </p>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAccept}
            className="w-full"
          >
            {t('cookieBannerButton')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}