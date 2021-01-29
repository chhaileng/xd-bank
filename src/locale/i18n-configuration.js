import i18n from 'i18next';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locale-en.json';
import km from './locale-km.json';

// set default language to km
localStorage.getItem('locale') || localStorage.setItem('locale', 'km');

i18n
  .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      km
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      lookupLocalStorage: 'locale',
      order: ['localStorage']
    },
  });

export default i18n;
