import * as api from '../../../api-def/api';
import {getFullApiUrl} from './endpoints';
import ApiRequestPayloadMaker from './requestPayloadMaker';

/**
 * Class for sending an API request.
 */
export class ApiRequestSender {
  // region User controls

  /**
   * Send a user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {Promise<UserLoginResponse>} promise returned from `fetch`
   */
  static userLogin(googleUid: string, googleEmail: string): Promise<api.UserLoginResponse> {
    return ApiRequestSender.sendRequest<api.UserLoginResponse>(
      'POST',
      api.ApiEndPoints.USER_LOGIN,
      ApiRequestPayloadMaker.userLogin(googleUid, googleEmail),
    );
  }

  // endregion


  // region Quest posts

  /**
   * Get a quest post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {Promise<QuestPostGetSuccessResponse>} promise returned from `fetch`
   */
  static questPostGet(
    googleUid: string, seqId: number, langCode: string, increaseCount?: boolean):
    Promise<api.QuestPostGetSuccessResponse> {
    return ApiRequestSender.sendRequest<api.QuestPostGetSuccessResponse>(
      'GET',
      api.ApiEndPoints.POST_QUEST_GET,
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
    googleUid: string, langCode: string, start: number, limit: number): Promise<api.QuestPostListResponse> {
    return ApiRequestSender.sendRequest<api.QuestPostListResponse>(
      'GET',
      api.ApiEndPoints.POST_QUEST_LIST,
      ApiRequestPayloadMaker.questPostList(googleUid, langCode, start, limit),
    );
  }

  /**
   * Send a quest post publish request.
   *
   * @param {QuestPostEditPayload} payload payload for publishing a post
   * @return {Promise<QuestPostPublishSuccessResponse>} promise returned from `fetch`
   */
  static questPostPublish(payload: api.QuestPostPublishPayload): Promise<api.QuestPostPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<api.QuestPostPublishSuccessResponse>(
      'POST',
      api.ApiEndPoints.POST_QUEST_PUBLISH,
      payload,
    );
  }

  /**
   * Send a quest post edit request.
   *
   * @param {QuestPostEditPayload} payload payload for editing a quest post
   * @return {Promise<QuestPostEditSuccessResponse>} promise returned from `fetch`
   */
  static questPostEdit(payload: api.QuestPostEditPayload): Promise<api.QuestPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<api.QuestPostEditSuccessResponse>(
      'POST',
      api.ApiEndPoints.POST_QUEST_EDIT,
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
    googleUid: string, seqId: number | null, langCode: string): Promise<api.QuestPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<api.QuestPostIdCheckResponse>(
      'GET',
      api.ApiEndPoints.POST_QUEST_ID_CHECK,
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
    payload: api.CharaAnalysisPostPublishPayload): Promise<api.CharaAnalysisPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<api.CharaAnalysisPublishSuccessResponse>(
      'POST',
      api.ApiEndPoints.POST_ANALYSIS_PUBLISH_CHARA,
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
    payload: api.DragonAnalysisPostPublishPayload): Promise<api.DragonAnalysisPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<api.DragonAnalysisPublishSuccessResponse>(
      'POST',
      api.ApiEndPoints.POST_ANALYSIS_PUBLISH_DRAGON,
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
    googleUid: string, langCode: string, start: number, limit: number): Promise<api.AnalysisPostListResponse> {
    return ApiRequestSender.sendRequest<api.AnalysisPostListResponse>(
      'GET',
      api.ApiEndPoints.POST_ANALYSIS_LIST,
      ApiRequestPayloadMaker.analysisPostList(googleUid, langCode, start, limit),
    );
  }

  /**
   * Get an analysis post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {Promise<AnalysisPostGetSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostGet(
    googleUid: string, seqId: number, langCode: string, increaseCount?: boolean):
    Promise<api.CharacterAnalysisPost | api.DragonAnalysisPost> {
    return ApiRequestSender.sendRequest<api.AnalysisPostGetSuccessResponse>(
      'GET',
      api.ApiEndPoints.POST_ANALYSIS_GET,
      ApiRequestPayloadMaker.analysisPostGet(googleUid, seqId, langCode, increaseCount),
    )
      .then((response) => {
        if (response.type === api.AnalysisPostType.CHARACTER) {
          return (response as api.CharacterAnalysisPost);
        } else if (response.type === api.AnalysisPostType.DRAGON) {
          return (response as api.DragonAnalysisPost);
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
    payload: api.CharaAnalysisPostEditPayload): Promise<api.AnalysisPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<api.AnalysisPostEditSuccessResponse>(
      'POST',
      api.ApiEndPoints.POST_ANALYSIS_EDIT_CHARA,
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
    payload: api.DragonAnalysisPostEditPayload): Promise<api.AnalysisPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<api.AnalysisPostEditSuccessResponse>(
      'POST',
      api.ApiEndPoints.POST_ANALYSIS_EDIT_DRAGON,
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
    googleUid: string, seqId: number | null, langCode: string): Promise<api.AnalysisPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<api.AnalysisPostIdCheckResponse>(
      'GET',
      api.ApiEndPoints.POST_ANALYSIS_ID_CHECK,
      ApiRequestPayloadMaker.analysisPostIdCheck(googleUid, seqId, langCode),
    );
  }

  // endregion


  /**
   * Base method to send an API request.
   *
   * @param {string} method http method
   * @param {string} endpoint destination to send the request - this should be endpoint only, not the full URL
   * @param {any} payload payload to be used
   * @return {Promise<T>} promise returned from `fetch`
   */
  private static sendRequest<T>(method: 'GET' | 'POST', endpoint: string, payload): Promise<T> {
    endpoint = getFullApiUrl(endpoint);

    console.log(`[API] Sending ${method} request to ${endpoint}`);

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
