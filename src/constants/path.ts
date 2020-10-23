/**
 * Class of all the paths.
 */
export default class Path {
  // Home

  static HOME = '/';

  // Posts

  static QUEST_DIR = '/quest';
  static QUEST = '/quest/:qid';

  static NEW_OBJECT_DIR = '/object';
  static NEW_OBJECT = '/object/:oid';

  static MISC_DIR = '/misc';
  static MISC = '/misc/:pid';

  // In-game data

  static CEX = '/cex';

  static SKILL_ATK = '/skill-atk';
  static SKILL_SUP = '/skill-sup';

  static PRINT = '/print';

  static STORY = '/story';

  // Tools

  static DMG_CALC = '/damage';
  static ROTATION_CALC = '/rotations';

  // Not game related

  static ABOUT = '/about';

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
   * Get the path of a quest info post. ('/quest/:qid')
   *
   * @param {number | string} qid quest info post ID
   * @return {string} path of a quest info post
   */
  static getQuest(qid: number | string): string {
    return Path.QUEST.replace(':qid', qid.toString());
  }

  /**
   * Get the path of a new object post. ('/object/:oid')
   *
   * @param {number | string} oid quest new object post ID
   * @return {string} path of a new object post
   */
  static getNewObject(oid: number | string): string {
    return Path.QUEST.replace(':oid', oid.toString());
  }

  /**
   * Get the path of a miscellaneous post. ('/misc/:pid')
   *
   * @param {number | string} pid post ID
   * @return {string} path of a miscellaneous post
   */
  static getMisc(pid: number | string): string {
    return Path.MISC.replace(':pid', pid.toString());
  }
}
