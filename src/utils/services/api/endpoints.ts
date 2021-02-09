/**
 * Class for API endpoints.
 */
export default class ApiEndPoints {
  static ROOT = process.env.REACT_APP_API_ROOT;

  static USER_LOGIN = '/user/login';

  static POST_QUEST_PUBLISH = '/posts/quest/publish';
  static POST_QUEST_LIST = '/posts/quest';
  static POST_QUEST_GET = '/posts/quest/get';
  static POST_QUEST_EDIT = '/posts/quest/edit';
  static POST_QUEST_ID_CHECK = '/posts/quest/id-check';

  static POST_ANALYSIS_PUBLISH_CHARA = '/posts/analysis/publish/chara';
  static POST_ANALYSIS_PUBLISH_DRAGON = '/posts/analysis/publish/dragon';
  static POST_ANALYSIS_LIST = '/posts/analysis';
  static POST_ANALYSIS_GET = '/posts/analysis/get';
  static POST_ANALYSIS_EDIT_CHARA = '/posts/analysis/edit/chara';
  static POST_ANALYSIS_EDIT_DRAGON = '/posts/analysis/edit/dragon';
  static POST_ANALYSIS_ID_CHECK = '/posts/analysis/id-check';

  /**
   * Get the full URL of an API endpoint.
   *
   * @param {string} endpoint endpoint of the API, starting with a slash (`/`)
   * @return {string} full URL of an API endpoint
   */
  public static getFullUrl(endpoint: string): string {
    return ApiEndPoints.ROOT + endpoint;
  }
}
