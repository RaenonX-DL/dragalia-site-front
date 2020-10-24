import {generatePath} from 'react-router-dom';

/**
 * Class of all the paths.
 */
export default class Path {
  // Home

  static HOME = '/';

  // Posts

  static QUEST_DIR = '/quest';
  static QUEST_NEW = '/quest/new';
  static QUEST = '/quest/:qid(\\d+)';

  static NEW_OBJECT_DIR = '/object';
  static NEW_OBJECT = '/object/:oid(\\d+)';

  static MISC_DIR = '/misc';
  static MISC = '/misc/:pid(\\d+)';

  // In-game data

  static CEX = '/cex';
  static PRINT = '/print';

  static SKILL_ATK = '/skill-atk';
  static SKILL_SUP = '/skill-sup';

  static STORY = '/story';

  // Tools

  static DMG_CALC = '/damage';
  static ROTATION_CALC = '/rotations';

  // Not game related

  static ABOUT = '/about';

  /**
   * Get the path of a quest info post. ('/quest/:qid')
   *
   * @param {number | string} qid quest info post ID
   * @return {string} path of a quest info post
   */
  static getQuest(qid: number | string): string {
    return generatePath(Path.QUEST, {qid});
  }

  /**
   * Get the path of a new object post. ('/object/:oid')
   *
   * @param {number | string} oid quest new object post ID
   * @return {string} path of a new object post
   */
  static getNewObject(oid: number | string): string {
    return generatePath(Path.NEW_OBJECT, {oid});
  }

  /**
   * Get the path of a miscellaneous post. ('/misc/:pid')
   *
   * @param {number | string} pid post ID
   * @return {string} path of a miscellaneous post
   */
  static getMisc(pid: number | string): string {
    return generatePath(Path.MISC, {pid});
  }
}
