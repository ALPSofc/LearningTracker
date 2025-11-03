import React, { useMemo } from 'react';
import { useData } from '../../hooks/useData';
import { useTranslation } from 'react-i18next';
// 1. A importação de 'motivationalTips' foi REMOVIDA.

// 2. Definimos a lista de CHAVES (Keys) que estão no seu JSON
const tipKeys = [
  'tip_1',
  'tip_2',
  'tip_3',
  'tip_4',
  'tip_5',
  'tip_6',
  'tip_7',
  'tip_8',
  'tip_9',
  'tip_10'
];

export default function Greeting() {
  const { userName } = useData();
  const { t } = useTranslation(); // Pega a função 't'

  // 3. 'useMemo' agora usa 't' e depende dele
  const randomTip = useMemo(() => {
    // Pega uma CHAVE aleatória (ex: 'tip_7')
    const randomKey = tipKeys[Math.floor(Math.random() * tipKeys.length)];
    // TRADUZ a chave (ex: t('tip_7') -> "Você não falha...")
    return t(randomKey);
    
  // 4. 't' é adicionado como dependência.
  // Isso garante que a dica seja RE-TRADUZIDA se o idioma mudar.
  }, [t]); 

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {t('welcomeBack', { name: userName })}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 italic">
        {/* A 'randomTip' agora é traduzida */}
        "{randomTip}"
      </p>
    </div>
  );
}