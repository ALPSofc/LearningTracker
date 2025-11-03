import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useData } from '../../hooks/useData';

const getPageTitleKey = (pathname) => {
  const path = pathname.split('/')[1];
  switch (path) {
    case '': return 'navHome';
    case 'minhasmetas': return 'navGoals';
    case 'statistics': return 'navStats';
    case 'settings': return 'navSettings';
    case 'about': return 'navAbout';
    default: return 'pageNotFound';
  }
};

export default function Header() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { userName } = useData();
  const title = t(getPageTitleKey(pathname));

  return (
    <header className="bg-white dark:bg-slate-800 p-4 border-b border-gray-200 dark:border-slate-700
                       flex justify-between items-center sticky top-0 z-30 
                       rounded-t-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">
          {t('welcomeGreeting')}, {userName}
        </span>
        <div className="w-9 h-9 bg-blue-200 dark:bg-blue-700 rounded-full 
                       flex items-center justify-center font-semibold 
                       text-blue-800 dark:text-blue-200">
          {userName ? userName[0].toUpperCase() : 'V'}
        </div>
      </div>
    </header>
  );
}