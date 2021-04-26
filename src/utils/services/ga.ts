import {InputData as ExInputData} from '../../components/elements/gameData/ex/in/types';
import {InputData as AtkInputData} from '../../components/elements/gameData/skillAtk/in/types';

/**
 * Google Analytics event names.
 */
export class GAEvent {
  static LANG_CHANGE = 'lang_change';
  static LOGIN = 'login';
  static ANCHOR = 'anchor';
  static PAGE_VIEW = 'page_view';
  static DAMAGE_CALCULATOR = 'damage_calc';
  static ABILITY_SEARCH = 'ability_search';
}

/**
 * Class for sending GA events.
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
   * Record the event of an user performed a search using damage calculator.
   *
   * @param {string} action action performed on the damage calculator
   * @param {InputData} inputData data input used for calculating the damage
   */
  static damageCalc(action: 'search', inputData: AtkInputData) {
    GoogleAnalytics.sendEvent(
      GAEvent.DAMAGE_CALCULATOR,
      {
        'action': action,
        ...inputData,
      },
    );
  }

  /**
   * Record the event of an user performed an ability search.
   *
   * @param {string} action action performed of the ability search
   * @param {InputData} inputData data input used for searching the ability
   */
  static abilitySearch(action: 'EX' | 'Character' | 'Wyrmprint', inputData: ExInputData) {
    GoogleAnalytics.sendEvent(
      GAEvent.ABILITY_SEARCH,
      {
        'action': action,
        ...inputData,
      },
    );
  }

  /**
   * Record the event of an user uses the anchor.
   *
   * There are a few types of `usage`:
   *
   * - `navigate`: the user was navigated to the location of the anchor
   * - `navFailed`: ~~the anchor was not found in the page, failed to navigate~~
   *   - Currently not using, needs optimization
   * - `click`: the user clicked on the anchor mark (possibly to obtain the link)
   *   - This should also trigger `navigate` since the page will navigate on click.
   *
   * @param {'navigate' | 'click'} usage how the user uses the anchor
   * @param {string} anchorHash hash of the anchor
   */
  static anchor(usage: 'navigate' | 'navFailed' | 'click', anchorHash: string) {
    GoogleAnalytics.sendEvent(
      GAEvent.ANCHOR,
      {
        'usage': usage,
        'hash': anchorHash,
        'path': window.location.href,
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
