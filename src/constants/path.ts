import {generatePath} from 'react-router-dom';

/**
 * Class of all the paths.
 */
export default class Path {
  // Home

  static HOME = '/';

  // Posts

  static QUEST_LIST = '/quest';
  static QUEST_NEW = '/quest/new';
  static QUEST = '/quest/:pid(\\d+)';
  static QUEST_EDIT = '/quest/:pid(\\d+)/edit';

  static NEW_OBJECT_LIST = '/object';
  static NEW_OBJECT = '/object/:pid(\\d+)';

  static MISC_LIST = '/misc';
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
   * Get the path of a quest info post. ('/quest/:pid')
   *
   * @param {number | string} pid quest info post ID
   * @return {string} path of a quest info post
   */
  static getQuest(pid: number | string): string {
    return generatePath(Path.QUEST, {pid});
  }

  /**
   * Get the path for editing a quest info post. ('/quest/:pid/edit')
   *
   * @param {number | string} pid quest info post ID
   * @return {string} path of a quest info post to be edited
   */
  static getQuestEdit(pid: number | string): string {
    return generatePath(Path.QUEST_EDIT, {pid});
  }

  /**
   * Get the path of a new object post. ('/object/:oid')
   *
   * @param {number | string} pid quest new object post ID
   * @return {string} path of a new object post
   */
  static getNewObject(pid: number | string): string {
    return generatePath(Path.NEW_OBJECT, {pid});
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
