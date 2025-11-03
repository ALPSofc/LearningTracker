import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isPt = i18n.language.startsWith('pt');
  const toggleLanguage = () => {
    i18n.changeLanguage(isPt ? 'en' : 'pt');
  };

  const title = isPt ? t('langToggleEN') : t('langTogglePT');

  return (
    <button
      onClick={toggleLanguage}
      className="p-3 w-12 h-12 rounded-full text-gray-400 hover:text-blue-500 dark:hover:text-blue-500
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
      title={title}
      aria-label={title}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isPt ? 'pt' : 'en'}
          className="font-bold text-lg absolute top-1/2 left-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {isPt ? 'PT' : 'EN'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}