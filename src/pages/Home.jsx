import React from 'react';
import Greeting from '../components/home/Greeting';
import OverallProgress from '../components/home/OverallProgress';
import RecentAchievements from '../components/home/RecentAchievements';
import RecentActivity from '../components/home/RecentActivity';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Greeting />
        <OverallProgress />
        <RecentAchievements />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <RecentActivity />       
      </div>
    </div>
  );
}