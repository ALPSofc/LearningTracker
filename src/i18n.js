import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['pt', 'en'],
    fallbackLng: 'pt',
    nonExplicitSupportedLngs: true,

    load: 'languageOnly',
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`⚠️ Falha ao carregar tradução: ${lng}/${ns}`, msg);
});

i18n.on('loaded', (loaded) => {
  console.log('✅ Traduções carregadas:', loaded);
});
