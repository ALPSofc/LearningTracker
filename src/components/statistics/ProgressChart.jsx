import React from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import Card from '../ui/Card';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

export default function ProgressChart() {
  const { tracks } = useData();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const chartData = tracks.map(track => ({
    name: track.name,
    progresso: track.progress,
    fullMark: 100,
  }));

  const textColor = theme === 'dark' ? '#cbd5e1' : '#374151';
  const gridColor = theme === 'dark' ? '#4b5563' : '#e5e7eb';
  const tooltipBg = theme === 'dark' ? '#1f2937' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#374151' : '#e5e7eb';

  const renderContent = () => {
    if (chartData.length < 3) {
      return (
        <div className="text-center p-10 text-gray-500 dark:text-gray-400">
          <p>{t('statsChartEmpty')}</p>
        </div>
      );
    }
    
    return (
      <div className="w-full">
        <ResponsiveContainer width="99%" height={400}> 
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="name" tick={{ fill: textColor, fontSize: 14 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: textColor, fontSize: 12 }} />
            <Radar 
              name={t('progress')}
              dataKey="progresso" 
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder }} 
              itemStyle={{ color: textColor }}
            />
            <Legend wrapperStyle={{ color: textColor }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card titleKey="statsChartTitle">
      {renderContent()}
    </Card>
  );
}