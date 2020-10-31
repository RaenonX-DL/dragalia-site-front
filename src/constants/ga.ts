/**
 * Google Analytics custom event name.
 */
export class GAEvent {
  static LANG_CHANGE = 'lang_change';
  static LOGIN = 'login';
  static PAGE_VIEW = 'page_view';
}

/**
 * Class for sending custom GA events.
 */
export class GoogleAnalytics {
  /**
   * Record the event of switching the language.
   *
   * @param {string} oldLang old language
   * @param {string} newLang new language
   */
  static languageChange(oldLang: string, newLang: string) {
    GoogleAnalytics.sendEvent(
      GAEvent.LANG_CHANGE,
      {
        'old': oldLang,
        'new': newLang,
      },
    );
  }

  /**
   * Record the event of an user logged in.
   *
   * @param {string} method method used for login
   * @param {boolean} success if the login succeed
   */
  static login(method: string = 'Google', success: boolean = true) {
    GoogleAnalytics.sendEvent(
      GAEvent.LOGIN,
      {
        'method': method,
        'success': success,
      },
    );
  }

  /**
   * Record the event of a page view.
   *
   * @param {Location} location location object
   */
  static pageView(location: Location) {
    GoogleAnalytics.sendEvent(
      GAEvent.PAGE_VIEW,
      {
        'page_location': location.href,
        'page_title': document.title,
        'page_path': location.pathname,
      },
    );
  }

  /**
   * Send a Google Analytics event via gtag.js.
   *
   * @param {string} eventName name of the event
   * @param {Object} parameters parameters of the event
   */
  private static sendEvent(eventName: string, parameters: Object) {
    // @ts-ignore
    window.gtag('event', eventName, parameters);
  }
}
