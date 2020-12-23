/**
 * Class for API endpoints.
 */
export default class ApiEndPoints {
  static ROOT = process.env.REACT_APP_API_ROOT;

  static USER_LOGIN = ApiEndPoints.ROOT + '/user/login';

  static POST_QUEST_PUBLISH = ApiEndPoints.ROOT + '/posts/quest/publish';
  static POST_QUEST_LIST = ApiEndPoints.ROOT + '/posts/quest';
  static POST_QUEST_GET = ApiEndPoints.ROOT + '/posts/quest/get';
  static POST_QUEST_EDIT = ApiEndPoints.ROOT + '/posts/quest/edit'
  static POST_QUEST_ID_CHECK = ApiEndPoints.ROOT + '/posts/quest/id-check';

  static POST_ANALYSIS_PUBLISH_CHARA = ApiEndPoints.ROOT + '/posts/analysis/publish/chara';
  static POST_ANALYSIS_PUBLISH_DRAGON = ApiEndPoints.ROOT + '/posts/analysis/publish/dragon'
  static POST_ANALYSIS_LIST = ApiEndPoints.ROOT + '/posts/analysis';
  static POST_ANALYSIS_GET = ApiEndPoints.ROOT + '/posts/analysis/get';
  static POST_ANALYSIS_EDIT_CHARA = ApiEndPoints.ROOT + '/posts/analysis/edit/chara';
  static POST_ANALYSIS_EDIT_DRAGON = ApiEndPoints.ROOT + '/posts/analysis/edit/dragon';
  static POST_ANALYSIS_ID_CHECK = ApiEndPoints.ROOT + '/posts/analysis/id-check';
}
