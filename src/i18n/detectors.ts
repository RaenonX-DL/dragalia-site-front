import {SupportedLanguages} from '../api-def/api';
import {DEFAULT_LANG, mapToSupportedLang} from './langCode';
import {DetectorFunction} from './types';

const navigatorDetector = () => {
  const found: Array<string> = [];

  if (navigator) {
    // chrome only: not an array, so can't use .push.apply instead of iterating
    if (navigator.languages) {
      for (let i = 0; i < navigator.languages.length; i++) {
        found.push(navigator.languages[i]);
      }
    }

    // https://www.programmersought.com/article/12391976286/
    if (navigator.language) {
      found.push(navigator.language);
    }
  }

  return found.length > 0 ? mapToSupportedLang(found[0]) : undefined;
};

const detectors: Array<DetectorFunction> = [
  navigatorDetector,
];

export const detectLanguage = (): SupportedLanguages => {
  for (const detector of detectors) {
    const lang = detector();

    if (!lang) {
      continue;
    }

    return mapToSupportedLang(lang);
  }

  return DEFAULT_LANG;
};
