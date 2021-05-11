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

  static ANALYSIS_LIST = '/analysis';
  static ANALYSIS_NEW_CHARA = '/analysis/new/chara';
  static ANALYSIS_NEW_DRAGON = '/analysis/new/dragon';
  static ANALYSIS = '/analysis/:pid(\\d+)';
  static ANALYSIS_EDIT = '/analysis/:pid(\\d+)/edit';

  static MISC_LIST = '/misc';
  static MISC = '/misc/:pid(\\d+)';

  // In-game data

  static EX = '/ex';
  static PRINT = '/print';

  static SKILL_ATK = '/skill/atk';
  static SKILL_SUP = '/skill/sup';

  static STORY = '/story';

  // Tools

  static ROTATION_CALC = '/rotations';

  // Not game related

  static ABOUT = '/about';
  static SPECIAL_THANKS = '/thanks';

  /**
   * Get the path of a quest info post. ('/quest/:pid')
   *
   * @param {number | string} pid quest info post ID
   * @return {string} path of a quest info post
   */
  static getQuest(pid: number): string {
    return generatePath(Path.QUEST, {pid});
  }

  /**
   * Get the path for editing a quest info post. ('/quest/:pid/edit')
   *
   * @param {number | string} pid quest info post ID
   * @return {string} path of a quest info post to be edited
   */
  static getQuestEdit(pid: number): string {
    return generatePath(Path.QUEST_EDIT, {pid});
  }

  /**
   * Get the path of an analysis post. ('/analysis/:pid')
   *
   * @param {number | string} pid analysis post ID
   * @return {string} path of an analysis post
   */
  static getAnalysis(pid: number): string {
    return generatePath(Path.ANALYSIS, {pid});
  }

  /**
   * Get the path for editing an analysis post. ('/analysis/:pid/edit')
   *
   * @param {number | string} pid analysis post ID
   * @return {string} path of an analysis post to be edited
   */
  static getAnalysisEdit(pid: number): string {
    return generatePath(Path.ANALYSIS_EDIT, {pid});
  }

  /**
   * Get the path of a miscellaneous post. ('/misc/:pid')
   *
   * @param {number | string} pid post ID
   * @return {string} path of a miscellaneous post
   */
  static getMisc(pid: number): string {
    return generatePath(Path.MISC, {pid});
  }
}
