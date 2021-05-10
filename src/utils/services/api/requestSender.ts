import {
  AnalysisEditSuccessResponse,
  AnalysisGetPayload,
  AnalysisGetSuccessResponse,
  AnalysisIdCheckPayload,
  AnalysisIdCheckResponse,
  AnalysisListPayload,
  AnalysisListResponse,
  AnalysisResponse,
  AnalysisType,
  ApiEndPoints,
  BaseResponse,
  CharaAnalysisEditPayload,
  CharaAnalysisPublishPayload,
  CharaAnalysisPublishSuccessResponse,
  CharacterAnalysis,
  DragonAnalysis,
  DragonAnalysisEditPayload,
  DragonAnalysisPublishPayload,
  DragonAnalysisPublishSuccessResponse,
  QuestPostEditPayload,
  QuestPostEditSuccessResponse,
  QuestPostGetPayload,
  QuestPostGetSuccessResponse,
  QuestPostIdCheckPayload,
  QuestPostIdCheckResponse,
  QuestPostListPayload,
  QuestPostListResponse,
  QuestPostPublishPayload,
  QuestPostPublishSuccessResponse,
  RequestPayloadBase,
  SupportedLanguages,
  UserIsAdminPayload,
  UserIsAdminResponse,
  UserLoginPayload,
  UserLoginResponse,
} from '../../../api-def/api';
import {getFullApiUrl} from './utils';

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
  static userLogin(googleUid: string, googleEmail: string): Promise<UserLoginResponse> {
    return ApiRequestSender.sendRequest<UserLoginResponse, UserLoginPayload>(
      'POST',
      ApiEndPoints.USER_LOGIN,
      {googleUid, googleEmail},
    );
  }

  /**
   * Send a user admin privilege check request.
   *
   * @param {string} googleUid Google UID of the user yo check
   * @return {Promise<UserIsAdminResponse>} promise returned from `fetch`
   */
  static userIsAdmin(googleUid: string): Promise<UserIsAdminResponse> {
    return ApiRequestSender.sendRequest<UserIsAdminResponse, UserIsAdminPayload>(
      'GET',
      ApiEndPoints.USER_IS_ADMIN,
      {googleUid},
    );
  }

  // endregion

  // region Quest posts

  /**
   * Get a quest post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {SupportedLanguages} lang language code of the post to get
   * @param {boolean} incCount if the post view count should be increased or not
   * @return {Promise<QuestPostGetSuccessResponse>} promise returned from `fetch`
   */
  static questPostGet(
    googleUid: string, seqId: number, lang: SupportedLanguages, incCount?: boolean,
  ): Promise<QuestPostGetSuccessResponse> {
    return ApiRequestSender.sendRequest<QuestPostGetSuccessResponse, QuestPostGetPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_GET,
      {googleUid, seqId, lang, incCount},
    );
  }

  /**
   * Get a list of all quest posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {SupportedLanguages} langCode language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<QuestPostListResponse>} promise returned from `fetch`
   */
  static questPostList(
    googleUid: string, langCode: SupportedLanguages, start: number, limit: number,
  ): Promise<QuestPostListResponse> {
    return ApiRequestSender.sendRequest<QuestPostListResponse, QuestPostListPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_LIST,
      {googleUid, langCode, start, limit},
    );
  }

  /**
   * Send a quest post publish request.
   *
   * @param {QuestPostEditPayload} payload payload for publishing a post
   * @return {Promise<QuestPostPublishSuccessResponse>} promise returned from `fetch`
   */
  static questPostPublish(payload: QuestPostPublishPayload): Promise<QuestPostPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<QuestPostPublishSuccessResponse, QuestPostPublishPayload>(
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
  static questPostEdit(payload: QuestPostEditPayload): Promise<QuestPostEditSuccessResponse> {
    return ApiRequestSender.sendRequest<QuestPostEditSuccessResponse, QuestPostEditPayload>(
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
   * @param {SupportedLanguages} lang language code of the quest post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static questPostIdCheck(
    googleUid: string, seqId: number | null, lang: SupportedLanguages): Promise<QuestPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<QuestPostIdCheckResponse, QuestPostIdCheckPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_ID_CHECK,
      {seqId: seqId || undefined, googleUid, lang},
    );
  }

  // endregion

  // region Analysis posts

  /**
   * Send a character analysis post publish request.
   *
   * @param {CharaAnalysisPublishPayload} payload payload of a character analysis post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static analysisPostPublishChara(
    payload: CharaAnalysisPublishPayload,
  ): Promise<CharaAnalysisPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<CharaAnalysisPublishSuccessResponse, CharaAnalysisPublishPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_PUBLISH_CHARA,
      payload,
    );
  }

  /**
   * Send a dragon analysis post publish request.
   *
   * @param {DragonAnalysisPublishPayload} payload payload of a character analysis post
   * @return {Promise<DragonAnalysisPublishSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostPublishDragon(
    payload: DragonAnalysisPublishPayload,
  ): Promise<DragonAnalysisPublishSuccessResponse> {
    return ApiRequestSender.sendRequest<DragonAnalysisPublishSuccessResponse, DragonAnalysisPublishPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_PUBLISH_DRAGON,
      payload,
    );
  }

  /**
   * Get a list of all analysis posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {SupportedLanguages} langCode language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<AnalysisListResponse>} promise returned from `fetch`
   */
  static analysisPostList(
    googleUid: string, langCode: SupportedLanguages, start: number, limit: number,
  ): Promise<AnalysisListResponse> {
    return ApiRequestSender.sendRequest<AnalysisListResponse, AnalysisListPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_LIST,
      {googleUid, langCode, start, limit},
    );
  }

  /**
   * Get an analysis post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {SupportedLanguages} lang language code of the post to get
   * @param {boolean} incCount if the post view count should be increased or not
   * @return {Promise<AnalysisGetSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostGet(
    googleUid: string, seqId: number, lang: SupportedLanguages, incCount?: boolean,
  ):
    Promise<AnalysisResponse> {
    return ApiRequestSender.sendRequest<AnalysisGetSuccessResponse, AnalysisGetPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_GET,
      {googleUid, seqId, lang, incCount},
    )
      .then((response) => {
        // Cast the date string to `Date` object because the data sent from the backend is string
        response.modified = new Date(response.modified);
        response.published = new Date(response.published);

        if (response.type === AnalysisType.CHARACTER) {
          return (response as CharacterAnalysis);
        } else if (response.type === AnalysisType.DRAGON) {
          return (response as DragonAnalysis);
        } else {
          throw new Error('Unknown post type');
        }
      });
  }

  /**
   * Send a character analysis post edit request.
   *
   * @param {CharaAnalysisEditPayload} payload payload for editing a character analysis post
   * @return {Promise<AnalysisEditSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostEditChara(
    payload: CharaAnalysisEditPayload,
  ): Promise<AnalysisEditSuccessResponse> {
    return ApiRequestSender.sendRequest<AnalysisEditSuccessResponse, CharaAnalysisEditPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_EDIT_CHARA,
      payload,
    );
  }

  /**
   * Send a dragon analysis post edit request.
   *
   * @param {DragonAnalysisEditPayload} payload payload for editing a dragon analysis post
   * @return {Promise<AnalysisEditSuccessResponse>} promise returned from `fetch`
   */
  static analysisPostEditDragon(
    payload: DragonAnalysisEditPayload,
  ): Promise<AnalysisEditSuccessResponse> {
    return ApiRequestSender.sendRequest<AnalysisEditSuccessResponse, DragonAnalysisEditPayload>(
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
   * @param {SupportedLanguages} lang language code of the analysis post
   * @return {Promise<AnalysisIdCheckResponse>} promise returned from `fetch`
   */
  static analysisPostIdCheck(
    googleUid: string, seqId: number | null, lang: SupportedLanguages,
  ): Promise<AnalysisIdCheckResponse> {
    return ApiRequestSender.sendRequest<AnalysisIdCheckResponse, AnalysisIdCheckPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_ID_CHECK,
      {seqId: seqId || undefined, googleUid, lang},
    );
  }

  // endregion

  /**
   * Base method to send an API request.
   *
   * @param {string} method http method
   * @param {string} endpoint destination to send the request - this should be endpoint only, not the full URL
   * @param {RequestPayloadBase} payload payload to be used
   * @return {Promise<R>} promise returned from `fetch`
   */
  private static sendRequest<R extends BaseResponse, P extends RequestPayloadBase>(
    method: 'GET' | 'POST', endpoint: string, payload: P,
  ): Promise<R> {
    endpoint = getFullApiUrl(endpoint);

    const initOptionsBase = {
      method: method,
      headers: {'Content-Type': 'application/json'},
    };

    console.debug(`[API] Sending ${method} request to ${endpoint}`);

    if (method === 'GET') {
      return fetch(`${endpoint}?${new URLSearchParams(payload).toString()}`, initOptionsBase)
        .then((response) => response.json())
        .then((data) => data as R);
    }

    if (method === 'POST') {
      return fetch(endpoint, {
        ...initOptionsBase,
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => data as R);
    }

    throw new Error(`Unhandled method: ${method}`);
  }
}
