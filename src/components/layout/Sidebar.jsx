import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import { FaHome, FaTasks, FaChartBar, FaCog, FaInfoCircle } from 'react-icons/fa';
import AppLogo from '../../assets/logo.png'; 

export default function Sidebar() {
  const { t } = useTranslation(); 
  const baseLinkClass = "flex items-center space-x-3 p-3 rounded-lg transition-colors";
  const activeLinkClass = "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 font-bold";
  const inactiveLinkClass = "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700";
  const getNavLinkClass = ({ isActive }) => {
    return `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`;
  };

  return (
    <div className="w-64 h-full bg-white text-gray-800 p-5 flex flex-col 
                    shadow-lg rounded-2xl
                    dark:bg-slate-800 dark:text-white 
                    border border-transparent dark:border-slate-700">
      
      <div className="mb-10 text-center">
        <img 
          src={AppLogo} 
          alt={t('appTitle')}
          className="h-10 mx-auto"
        />
      </div>

      <nav className="flex-grow flex flex-col space-y-2">
        
        <NavLink to="/" className={getNavLinkClass} end>
          <FaHome />
          <span>{t('navHome')}</span>
        </NavLink>
        
        <NavLink to="/minhasmetas" className={getNavLinkClass}>
          <FaTasks />
          <span>{t('navGoals')}</span>
        </NavLink>

        <NavLink to="/statistics" className={getNavLinkClass}>
          <FaChartBar />
          <span>{t('navStats')}</span>
        </NavLink>

        <NavLink 
          to="/settings"
          className={getNavLinkClass}
        >
          <FaCog />
          <span>{t('navSettings')}</span>
        </NavLink>
        <NavLink 
          to="/about"
          className={getNavLinkClass}
        >
          <FaInfoCircle />
          <span>{t('navAbout')}</span>
        </NavLink>
      </nav>

      <div className="flex-shrink-0 flex justify-center items-center gap-2 border-t border-gray-200 dark:border-slate-700 pt-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
}