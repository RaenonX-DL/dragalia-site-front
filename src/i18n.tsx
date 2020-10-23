import i18n from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

// https://github.com/i18next/i18next-http-backend
// https://github.com/i18next/i18next-browser-languageDetector
// https://www.i18next.com/overview/configuration-options

// noinspection JSIgnoredPromiseFromCall
i18n
  .use(I18NextHttpBackend)
  .use(new LanguageDetector(
    null,
    {lookupQuerystring: 'lang'}))
  .use(initReactI18next)
  .init({
    fallbackLng: false,
    debug: false,
  });

// noinspection JSUnusedGlobalSymbols
export default i18n;
