import LanguageDetector from 'i18next-browser-languagedetector';

import {mapToCustomCode} from './langCodeTrans';

let hasLocalStorageSupport: null | boolean = null;

const localStorageAvailable = () => {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;

  try {
    hasLocalStorageSupport = window.localStorage !== null;
    const testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};

export const I18nLanguageDetector = new LanguageDetector(
  null,
  {
    lookupQuerystring: 'lang',
    order: ['queryStringDetector', 'localStorageDetector', 'navigatorDetector'],
    caches: ['localStorageDetector'],
  });

// region Query String Detector
I18nLanguageDetector.addDetector({
  name: 'queryStringDetector',

  lookup(options) {
    let found;

    if (!window) {
      return;
    }

    const query = window.location.search.substring(1);
    const params = query.split('&');

    for (let i = 0; i < params.length; i++) {
      const pos = params[i].indexOf('=');

      if (pos <= 0) {
        continue;
      }

      const key = params[i].substring(0, pos);
      if (key === options.lookupQuerystring) {
        found = params[i].substring(pos + 1);
      }
    }

    return mapToCustomCode(found);
  },
});
// endregion

// region Local Storage Detector
I18nLanguageDetector.addDetector({
  name: 'localStorageDetector',

  lookup(options) {
    if (!options.lookupLocalStorage || !localStorageAvailable()) {
      return;
    }

    return mapToCustomCode(window.localStorage.getItem(options.lookupLocalStorage));
  },

  cacheUserLanguage(lng, options) {
    if (!options.lookupLocalStorage || !localStorageAvailable()) {
      return;
    }
    window.localStorage.setItem(options.lookupLocalStorage, lng);
  },
});
// endregion

// region Navigator Detector
I18nLanguageDetector.addDetector({
  name: 'navigatorDetector',

  lookup() {
    const found: Array<string> = [];

    if (navigator) {
      if (navigator.languages) { // chrome only; not an array, so can't use .push.apply instead of iterating
        for (let i = 0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }

      // https://www.programmersought.com/article/12391976286/
      if (navigator.language) {
        found.push(navigator.language);
      }
    }

    return found.length > 0 ? mapToCustomCode(found[0]) : undefined;
  },
});
// endregion
