import Cookies from 'universal-cookie';

import {CookiesKeys} from '../const/cookies';

const cookies = new Cookies();

/**
 * Class for controlling the cookies.
 */
export class CookiesControl {
  /**
   * Get the Google UID in cookies if exists.
   *
   * Return `null` if not found.
   *
   * @return {string | null} Google UID in cookies.
   */
  static getGoogleUid(): string | null {
    return CookiesControl.getValue(CookiesKeys.GOOGLE_UID);
  }

  /**
   * Set Google UID to cookies, if it's not yet set.
   *
   * This returns `true` if the value in cookies is updated.
   * Otherwise, returns `false.
   *
   * @param {string} googleUid google UID in cookies
   * @return {boolean} if the value in cookies is updated
   */
  static setGoogleUid(googleUid: string): boolean {
    if (CookiesControl.getGoogleUid()) {
      return false;
    }
    CookiesControl.setValue(CookiesKeys.GOOGLE_UID, googleUid);
    return true;
  }

  /**
   * Remove Google UID in cookies, if exists.
   */
  static removeGoogleUid(): void {
    CookiesControl.removeValue(CookiesKeys.GOOGLE_UID);
  }

  /**
   * Get the value of `key` in cookies.
   *
   * @param {CookiesKeys} key key of the entry
   * @return {string | null} value of the entry
   * @private
   */
  private static getValue(key: CookiesKeys): string | null {
    return cookies.get(key);
  }

  /**
   * Set the value of `key` in cookies.
   *
   * @param {CookiesKeys} key key of the entry
   * @param {string} value value of the entry
   * @private
   */
  private static setValue(key: CookiesKeys, value: string): void {
    cookies.set(key, value, {path: '/'});
  }

  /**
   * Remove the entry of `key` from cookies.
   *
   * @param {CookiesKeys} key key of the cookies entry to be removed
   * @private
   */
  private static removeValue(key: CookiesKeys): void {
    cookies.remove(key, {path: '/'});
  }
}
