import ReactGA from 'react-ga';

/**
 * Google Analytics custom event category.
 */
export class GACategory {
  static APP_ACTION = 'App action'
}

/**
 * Google Analytics custom event action.
 */
export class GAAction {
  static SWITCH_LANG = 'Switch Language'
}

/**
 * Class for sending custom GA event
 */
export class GAEvent {
  /**
   * Record the event of switching the language.
   *
   * @param {string} newLang new language
   */
  static languageChange(newLang: string) {
    ReactGA.event({
      category: GACategory.APP_ACTION,
      action: GAAction.SWITCH_LANG,
      label: newLang,
      nonInteraction: false,
    });
  }
}
