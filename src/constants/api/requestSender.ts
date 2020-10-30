import ApiEndPoints from './endpoints';
import ApiRequestPayloadMaker from './requestPayloadMaker';
import {
  CharaAnalysisPostEditPayload,
  CharaAnalysisPostPublishPayload,
  DragonAnalysisPostEditPayload,
  DragonAnalysisPostPublishPayload,
  QuestPostEditPayload,
  QuestPostPublishPayload,
} from './requestPayload';
import * as Response from './response';

/**
 * Class for sending an API request.
 */
export default class ApiRequestSender {
  // region User controls

  /**
   * Send a user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {Promise<UserLoginResponse>} promise returned from `fetch`
   */
  static userLogin(googleUid: string, googleEmail: string): Promise<Response.UserLoginResponse> {
    return ApiRequestSender.sendRequest<Response.UserLoginResponse>(
      'POST',
      ApiEndPoints.USER_LOGIN,
      ApiRequestPayloadMaker.userLogin(googleUid, googleEmail),
    );
  }

  // endregion


  // region Quest posts

  /**
   * Get a quest post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {Promise<QuestPostGetSuccessResponse>} promise returned from `fetch`
   */
  static questPostGet(
    googleUid: string, seqId: string, langCode: string, increaseCount?: boolean):
    Promise<Response.QuestPostGetSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.QuestPostGetSuccessResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_GET,
      ApiRequestPayloadMaker.questPostGet(googleUid, seqId, langCode, increaseCount),
    );
  }

  /**
   * Get a list of all quest posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} langCode language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<QuestPostListResponse>} promise returned from `fetch`
   */
  static questPostList(
    googleUid: string, langCode: string, start: number, limit: number): Promise<Response.QuestPostListResponse> {
    return ApiRequestSender.sendRequest<Response.QuestPostListResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_LIST,
      ApiRequestPayloadMaker.questPostList(googleUid, langCode, start, limit),
    );
  }

  /**
   * Send a quest post publish request.
   *
   * @param {QuestPostEditPayload} payload payload for publishing a post
   * @return {Promise<QuestPostPublishSuccessResponse>} promise returned from `fetch`
   */
  static questPostPublish(payload: QuestPostPublishPayload): Promise<Response.QuestPostPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.QuestPostPublishSuccessResponse>(
      'POST',
      ApiEndPoints.POST_QUEST_PUBLISH,
      payload,
    );
  }

  /**
   * Send a quest post edit request.
   *
   * @param {QuestPostEditPayload} payload payload for editing a quest post
   * @return {Promise<QuestPostEditSuccessResponse>} promise returned from `fetch`
   */
  static questPostEdit(payload: QuestPostEditPayload): Promise<Response.QuestPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.QuestPostEditSuccessResponse>(
      'POST',
      ApiEndPoints.POST_QUEST_EDIT,
      payload,
    );
  }

  /**
   * Send a request to check if the ID combination for the quest post is available.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} seqId title of the post
   * @param {string} langCode language code of the quest post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static questPostIdCheck(
    googleUid: string, seqId: number | null, langCode: string): Promise<Response.QuestPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<Response.QuestPostIdCheckResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_ID_CHECK,
      ApiRequestPayloadMaker.questPostIdCheck(googleUid, seqId, langCode),
    );
  }

  // endregion


  // region Analysis posts

  /**
   * Send a character analysis post publish request.
   *
   * @param {CharaAnalysisPostPublishPayload} payload payload of a character analysis post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static analysisPostPublishChara(
    payload: CharaAnalysisPostPublishPayload): Promise<Response.CharaAnalysisPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.CharaAnalysisPublishSuccessResponse>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_PUBLISH_CHARA,
      payload,
    );
  }

  /**
   * Send a dragon analysis post publish request.
   *
   * @param {DragonAnalysisPostPublishPayload} payload payload of a character analysis post
   * @return {Promise<DragonAnalysisPublishSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostPublishDragon(
    payload: DragonAnalysisPostPublishPayload): Promise<Response.DragonAnalysisPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.DragonAnalysisPublishSuccessResponse>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_PUBLISH_DRAGON,
      payload,
    );
  }

  /**
   * Get a list of all analysis posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} langCode language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<AnalysisPostListResponse>} promise returned from `fetch`
   */
  static analysisPostList(
    googleUid: string, langCode: string, start: number, limit: number): Promise<Response.AnalysisPostListResponse> {
    return ApiRequestSender.sendRequest<Response.AnalysisPostListResponse>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_LIST,
      ApiRequestPayloadMaker.analysisPostList(googleUid, langCode, start, limit),
    );
  }

  /**
   * Get an analysis post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {Promise<AnalysisPostGetSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostGet(
    googleUid: string, seqId: string, langCode: string, increaseCount?: boolean):
    Promise<Response.CharacterAnalysisPost | Response.DragonAnalysisPost> {
    return ApiRequestSender.sendRequest<Response.AnalysisPostGetSuccessResponse>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_GET,
      ApiRequestPayloadMaker.analysisPostGet(googleUid, seqId, langCode, increaseCount),
    )
      .then((response) => {
        if (response.type === Response.AnalysisPostType.CHARACTER) {
          return (response as Response.CharacterAnalysisPost);
        } else if (response.type === Response.AnalysisPostType.DRAGON) {
          return (response as Response.DragonAnalysisPost);
        } else {
          throw new Error('Unknown post type');
        }
      });
  }

  /**
   * Send a character analysis post edit request.
   *
   * @param {CharaAnalysisPostEditPayload} payload payload for editing a character analysis post
   * @return {Promise<AnalysisPostEditSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostEditChara(
    payload: CharaAnalysisPostEditPayload): Promise<Response.AnalysisPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.AnalysisPostEditSuccessResponse>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_EDIT_CHARA,
      payload,
    );
  }

  /**
   * Send a dragon analysis post edit request.
   *
   * @param {DragonAnalysisPostEditPayload} payload payload for editing a dragon analysis post
   * @return {Promise<AnalysisPostEditSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostEditDragon(
    payload: DragonAnalysisPostEditPayload): Promise<Response.AnalysisPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<Response.AnalysisPostEditSuccessResponse>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_EDIT_DRAGON,
      payload,
    );
  }

  /**
   * Send a request to check if the ID combination for the analysis post is available.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} seqId title of the post
   * @param {string} langCode language code of the analysis post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static analysisPostIdCheck(
    googleUid: string, seqId: number | null, langCode: string): Promise<Response.AnalysisPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<Response.AnalysisPostIdCheckResponse>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_ID_CHECK,
      ApiRequestPayloadMaker.analysisPostIdCheck(googleUid, seqId, langCode),
    );
  }

  // endregion


  /**
   * Base method to send an API request.
   *
   * @param {string} method http method
   * @param {string} endpoint destination to send the request
   * @param {any} payload payload to be used
   * @return {Promise<T>} promise returned from `fetch`
   */
  private static sendRequest<T>(method: 'GET' | 'POST', endpoint: string, payload): Promise<T> {
    console.log(`API Call in ${method} - to ${endpoint}`);

    if (method === 'GET') {
      return fetch(`${endpoint}?${new URLSearchParams(payload).toString()}`, {
        method: method,
        headers: {'Content-Type': 'application/json'},
      })
        .then((response) => response.json())
        .then((data) => data as T);
    }

    if (method === 'POST') {
      return fetch(endpoint, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => data as T);
    }

    throw new Error(`Unhandled method: ${method}`);
  }
}
