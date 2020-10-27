import LanguageDetector from 'i18next-browser-languagedetector';

import {mapToCustomCode} from './langCodeTrans';


// region Query String

const queryStringDetector = {
  name: 'myQueryStringDetector',

  lookup(options) {
    let found;

    if (typeof window !== undefined) {
      const query = window.location.search.substring(1);
      const params = query.split('&');
      for (let i = 0; i < params.length; i++) {
        const pos = params[i].indexOf('=');
        if (pos > 0) {
          const key = params[i].substring(0, pos);
          if (key === options.lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }

    return mapToCustomCode(found);
  },
};

// endregion


// region Local Storage

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

const localStorageDetector = {
  name: 'myLocalStorageDetector',

  lookup(options) {
    let found;

    if (options.lookupLocalStorage && localStorageAvailable()) {
      const lng = window.localStorage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }

    return mapToCustomCode(found);
  },

  cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  },
};

// endregion


// region Navigator

const navigatorDetector = {
  name: 'myNavigatorDetector',

  lookup() {
    const found: Array<string> = [];

    if (typeof navigator !== undefined) {
      if (navigator.languages) { // chrome only; not an array, so can't use .push.apply instead of iterating
        for (let i=0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }

      // https://www.programmersought.com/article/12391976286/
      if (navigator['userLanguage']) {
        found.push(navigator['userLanguage']);
      }
      if (navigator.language) {
        found.push(navigator.language);
      }
    }

    return found.length > 0 ? mapToCustomCode(found[0]) : undefined;
  },
};

// endregion

export const I18nLanguageDetector = new LanguageDetector(
  null,
  {
    lookupQuerystring: 'lang',
    order: ['myQueryStringDetector', 'myLocalStorageDetector', 'myNavigatorDetector'],
    caches: ['myLocalStorageDetector'],
  });
I18nLanguageDetector.addDetector(queryStringDetector);
I18nLanguageDetector.addDetector(localStorageDetector);
I18nLanguageDetector.addDetector(navigatorDetector);
