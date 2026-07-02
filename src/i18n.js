import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/translation.json';
import fr from '../public/locales/fr/translation.json';
import it from '../public/locales/it/translation.json';
import es from '../public/locales/es/translation.json';
import de from '../public/locales/de/translation.json';
import pt from '../public/locales/pt/translation.json';
import ar from '../public/locales/ar/translation.json';
import ru from '../public/locales/ru/translation.json';
import zh from '../public/locales/zh/translation.json';
import hi from '../public/locales/hi/translation.json';
import ja from '../public/locales/ja/translation.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  it: { translation: it },
  es: { translation: es },
  de: { translation: de },
  pt: { translation: pt },
  ar: { translation: ar },
  ru: { translation: ru },
  zh: { translation: zh },
  hi: { translation: hi },
  ja: { translation: ja }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
