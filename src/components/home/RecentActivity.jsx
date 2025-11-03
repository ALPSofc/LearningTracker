import React from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import { FaPlus, FaCheck, FaTrophy } from 'react-icons/fa';

const activityConfig = {
  TRACK_ADD: {
    icon: FaPlus,
    color: 'text-green-500',
    labelKey: 'activityAddTrack'
  },
  GOAL_ADD: {
    icon: FaPlus,
    color: 'text-blue-500',
    labelKey: 'activityAddGoal'
  },
  GOAL_COMPLETE: {
    icon: FaCheck,
    color: 'text-blue-500',
    labelKey: 'activityCompleteGoal'
  },
  BADGE_EARNED: {
    icon: FaTrophy,
    color: 'text-yellow-500',
    labelKey: 'activityBadgeEarned'
  }
};

export default function RecentActivity() {
  const { activityLog } = useData();
  const { t } = useTranslation();

  return (
    <Card titleKey="activityLogTitle">
      {activityLog.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t('activityLogEmpty')}
        </p>
      ) : (
        <div className="space-y-4">
          {activityLog.map(item => {
            const config = activityConfig[item.type];
            if (!config) return null;

            const Icon = config.icon;

            return (
              <div key={item.id} className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mr-3`}>
                  <Icon />
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t(config.labelKey)}
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {item.payload.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}