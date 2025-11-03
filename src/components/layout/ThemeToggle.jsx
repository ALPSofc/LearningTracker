import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const title = theme === 'light' 
    ? t('themeToggleDark') 
    : t('themeToggleLight');

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-400
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={title}
      aria-label={title}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}