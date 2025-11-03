import React from 'react';
import BadgeGallery from '../components/statistics/BadgeGallery';
import ProgressChart from '../components/statistics/ProgressChart';

export default function Statistics() {
  return (
    <div className="space-y-6">
      <ProgressChart />
      <BadgeGallery />
    </div>
  );
}