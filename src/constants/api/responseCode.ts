/**
 * Class for API request response code.
 */
export default class ApiResponseCodes {
  static SUCCESS = 100;
  static SUCCESS_NEW = 101;

  static FAILED_LOGIN_NOT_RECORDED = 200;
  static FAILED_QUEST_NOT_PUBLISHED_NOT_ADMIN = 201;
  static FAILED_POST_NOT_EXISTS = 202;

  static FAILED_UNKNOWN = 999;
}
