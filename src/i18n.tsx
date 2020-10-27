import i18n from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

import {I18nLanguageDetector} from './i18n/detectors';

// https://github.com/i18next/i18next-http-backend
// https://github.com/i18next/i18next-browser-languageDetector
// https://www.i18next.com/overview/configuration-options


// noinspection JSIgnoredPromiseFromCall
i18n
  .use(I18NextHttpBackend)
  .use(I18nLanguageDetector)
  .use(initReactI18next)
  .init({
    // DON'T set the language `lng` here, because the user settings of language will then not being used
    fallbackLng: false,
    debug: false,
  });

// noinspection JSUnusedGlobalSymbols
export default i18n;
