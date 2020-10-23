/**
 * Class of all the paths.
 */
export default class Path {
  static HOME = '/';
  static ABOUT = '/about';
  static QUEST = '/quest/:qid';

  /**
   * Get the path of the home page. ('/')
   *
   * @return {string} path of the home page
   */
  static getHome(): string {
    return Path.HOME;
  }

  /**
   * Get the path of the about page. ('/about')
   *
   * @return {string} path of the about page
   */
  static getAbout(): string {
    return Path.ABOUT;
  }

  /**
   * Get the path of the quest info page. ('/quest/:qid')
   *
   * @param {[number, string]} qid Quest info ID
   * @return {string} path of the quest info page
   */
  static getQuest(qid: number | string): string {
    return Path.QUEST.replace(':qid', qid.toString());
  }
}
