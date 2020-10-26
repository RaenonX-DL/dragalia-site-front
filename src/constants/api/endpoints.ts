/**
 * Class for API endpoints.
 */
export default class ApiEndPoints {
  static ROOT = process.env.REACT_APP_API_ROOT;

  static USER_LOGIN = ApiEndPoints.ROOT + '/user/login';

  static POST_QUEST_GET = ApiEndPoints.ROOT + '/posts/quest/get';
  static POST_QUEST_LIST = ApiEndPoints.ROOT + '/posts/quest';
  static POST_QUEST_PUBLISH = ApiEndPoints.ROOT + '/posts/quest/publish';
}
