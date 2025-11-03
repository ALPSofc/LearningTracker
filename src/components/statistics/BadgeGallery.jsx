import React from 'react';
import { useData } from '../../hooks/useData';
import { allBadges } from '../../data/badges';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const badgeImageMap = {
  FIRST_GOAL: '/assets/badges/bronze.svg',
  STREAK_3: '/assets/badges/bronze.svg',
  FIRST_TRACK: '/assets/badges/silver.svg',
  HTML_MASTER: '/assets/badges/js-master.svg',
  THREE_TRACKS: '/assets/badges/js-master.svg'
};

const defaultBadge = '/assets/badges/js-master.svg';

export default function BadgeGallery() {
  const { unlockedBadges } = useData();
  const { t } = useTranslation();
  const unlockedIds = new Set(unlockedBadges);
  const allBadgesList = Object.values(allBadges);

  return (
    <Card titleKey="statsGalleryTitle">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {allBadgesList.map(badge => {
          const isUnlocked = unlockedIds.has(badge.id);
          const badgeSrc = badgeImageMap[badge.id] || defaultBadge;

          return (
            <div
              key={badge.id}
              title={t(badge.descKey)}
              className={`flex flex-col items-center text-center p-6 rounded-lg 
                          border-2 transition-all
                          ${
                            isUnlocked
                              ? 'border-yellow-400 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/50'
                              : 'border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 opacity-60'
                          }`}
            >
              <img src={badgeSrc} alt={t(badge.nameKey)} className="w-12 h-12 mb-2"/>

              <h4 className="font-semibold text-gray-900 dark:text-white">
                {t(badge.nameKey)}
              </h4>
              {!isUnlocked && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('statsBadgeLocked')}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}