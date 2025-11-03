import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';

const InfoText = ({ children }) => (
  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
    {children}
  </p>
);

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
  
      <Card titleKey="aboutIntroductionTitle">
        <p className="text-gray-700 dark:text-gray-300">
          {t('aboutIntroductionText')}
        </p>
      </Card>

      <Card titleKey="aboutLearningTitle">
        <InfoText>{t('aboutLearningText')}</InfoText>
      </Card>

      <Card titleKey="aboutChallengesTitle">
        <InfoText>{t('aboutChallengesText')}</InfoText>
      </Card>

      <Card titleKey="aboutNextStepsTitle">
        <InfoText>{t('aboutNextStepsText')}</InfoText>
      </Card>

    </div>
  );
}