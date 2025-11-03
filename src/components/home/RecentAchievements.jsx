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

export default function RecentAchievements() {
  const { unlockedBadges } = useData();
  const { t } = useTranslation();
  const recentBadgeIds = unlockedBadges.slice(-3).reverse();

  return (
    <Card titleKey="homeAchievementsTitle">
      {recentBadgeIds.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          {t('homeAchievementsText')}
        </p>
      ) : (
        <div className="space-y-4">
          {recentBadgeIds.map(badgeId => {
            const badge = allBadges[badgeId];
            const badgeSrc = badgeImageMap[badgeId] || defaultBadge; 
            
            if (badge) {
              return (
                <div key={badge.id} className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <img src={badgeSrc} alt={t(badge.nameKey)} className="w-8 h-8 mr-4"/>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t(badge.nameKey)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t(badge.descKey)}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </Card>
  );
}