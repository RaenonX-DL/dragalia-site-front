import fetch from 'node-fetch';

import {
  AnalysisEditResponse,
  AnalysisGetPayload,
  AnalysisGetResponse,
  AnalysisIdCheckPayload,
  AnalysisIdCheckResponse,
  AnalysisLookupLandingPayload, AnalysisLookupLandingResponse,
  AnalysisLookupPayload,
  AnalysisLookupResponse,
  AnalysisPublishResponse,
  AnalysisResponse,
  ApiEndPoints,
  BaseResponse,
  CharaAnalysisEditPayload,
  CharaAnalysisGetResponse,
  CharaAnalysisPublishPayload,
  DragonAnalysisEditPayload,
  DragonAnalysisGetResponse,
  DragonAnalysisPublishPayload,
  FailedResponse,
  PageMetaPayload,
  PageMetaResponse,
  PostPageMetaPayload,
  PostPageMetaResponse,
  PostType,
  QuestPostEditPayload,
  QuestPostEditResponse,
  QuestPostGetPayload,
  QuestPostGetResponse,
  QuestPostIdCheckPayload,
  QuestPostIdCheckResponse,
  QuestPostListPayload,
  QuestPostListResponse,
  QuestPostPublishPayload,
  QuestPostPublishResponse,
  RequestPayloadBase,
  SupportedLanguages,
  UnitType,
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

  // endregion

  // region Quest posts

  /**
   * Get a quest post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {SupportedLanguages} lang language code of the post to get
   * @param {boolean} incCount if the post view count should be increased or not
   * @return {Promise<QuestPostGetResponse>} promise returned from `fetch`
   */
  static questGet(
    googleUid: string, seqId: number, lang: SupportedLanguages, incCount?: boolean,
  ): Promise<QuestPostGetResponse> {
    return ApiRequestSender.sendRequest<QuestPostGetResponse, QuestPostGetPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_GET,
      {googleUid, seqId, lang, incCount},
    );
  }

  /**
   * Get a list of all quest posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {SupportedLanguages} lang language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<QuestPostListResponse>} promise returned from `fetch`
   */
  static questList(
    googleUid: string, lang: SupportedLanguages, start: number, limit: number,
  ): Promise<QuestPostListResponse> {
    return ApiRequestSender.sendRequest<QuestPostListResponse, QuestPostListPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_LIST,
      {googleUid, lang, start, limit},
    );
  }

  /**
   * Send a quest post publish request.
   *
   * @param {QuestPostEditPayload} payload payload for publishing a post
   * @return {Promise<QuestPostPublishResponse>} promise returned from `fetch`
   */
  static questPublish(payload: QuestPostPublishPayload): Promise<QuestPostPublishResponse> {
    return ApiRequestSender.sendRequest<QuestPostPublishResponse, QuestPostPublishPayload>(
      'POST',
      ApiEndPoints.POST_QUEST_PUBLISH,
      payload,
    );
  }

  /**
   * Send a quest post edit request.
   *
   * @param {QuestPostEditPayload} payload payload for editing a quest post
   * @return {Promise<QuestPostEditResponse>} promise returned from `fetch`
   */
  static questEdit(payload: QuestPostEditPayload): Promise<QuestPostEditResponse> {
    return ApiRequestSender.sendRequest<QuestPostEditResponse, QuestPostEditPayload>(
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
  static questIdCheck(
    googleUid: string, seqId: number | null, lang: SupportedLanguages): Promise<QuestPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<QuestPostIdCheckResponse, QuestPostIdCheckPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_ID_CHECK,
      {seqId: seqId || undefined, googleUid, lang},
    );
  }

  // endregion

  // region Analyses

  /**
   * Send a character analysis post publish request.
   *
   * @param {CharaAnalysisPublishPayload} payload payload of a character analysis post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static analysisPublishChara(
    payload: CharaAnalysisPublishPayload,
  ): Promise<AnalysisPublishResponse> {
    return ApiRequestSender.sendRequest<AnalysisPublishResponse, CharaAnalysisPublishPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_PUBLISH_CHARA,
      payload,
    );
  }

  /**
   * Send a dragon analysis post publish request.
   *
   * @param {DragonAnalysisPublishPayload} payload payload of a character analysis post
   * @return {Promise<AnalysisPublishResponse>} promise returned from `fetch`
   */
  static analysisPublishDragon(
    payload: DragonAnalysisPublishPayload,
  ): Promise<AnalysisPublishResponse> {
    return ApiRequestSender.sendRequest<AnalysisPublishResponse, DragonAnalysisPublishPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_PUBLISH_DRAGON,
      payload,
    );
  }

  /**
   * Send an analysis lookup info request.
   *
   * @param {string} googleUid Google UID to use for getting the analysis lookup
   * @param {SupportedLanguages} lang language to use for getting the analysis info
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static analysisLookup(googleUid: string, lang: SupportedLanguages): Promise<AnalysisLookupResponse> {
    return ApiRequestSender.sendRequest<AnalysisLookupResponse, AnalysisLookupPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_LOOKUP,
      {googleUid, lang},
    );
  }

  /**
   * Send an analysis lookup info request on landing.
   *
   * @param {string} googleUid Google UID to use for getting the analysis lookup
   * @param {SupportedLanguages} lang language to use for getting the analysis info
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static analysisLookupLanding(googleUid: string, lang: SupportedLanguages): Promise<AnalysisLookupLandingResponse> {
    return ApiRequestSender.sendRequest<AnalysisLookupLandingResponse, AnalysisLookupLandingPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_LOOKUP_LANDING,
      {googleUid, lang},
    );
  }

  /**
   * Get an analysis post using its unit ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} unitId unit ID of the analysis to get
   * @param {SupportedLanguages} lang language code of the post to get
   * @param {boolean} incCount if the post view count should be increased or not
   * @return {Promise<AnalysisGetResponse>} promise returned from `fetch`
   */
  static analysisGet(
    googleUid: string, unitId: number, lang: SupportedLanguages, incCount?: boolean,
  ):
    Promise<AnalysisResponse> {
    return ApiRequestSender.sendRequest<AnalysisGetResponse, AnalysisGetPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_GET,
      {googleUid, unitId, lang, incCount},
    )
      .then((response) => {
        if (response.type === UnitType.CHARACTER) {
          return (response as CharaAnalysisGetResponse);
        } else if (response.type === UnitType.DRAGON) {
          return (response as DragonAnalysisGetResponse);
        } else {
          throw new Error(`Unknown post type: ${UnitType[response.type]}`);
        }
      });
  }

  /**
   * Send a character analysis post edit request.
   *
   * @param {CharaAnalysisEditPayload} payload payload for editing a character analysis post
   * @return {Promise<AnalysisEditResponse>} promise returned from `fetch`
   */
  static analysisEditChara(
    payload: CharaAnalysisEditPayload,
  ): Promise<AnalysisEditResponse> {
    return ApiRequestSender.sendRequest<AnalysisEditResponse, CharaAnalysisEditPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_EDIT_CHARA,
      payload,
    );
  }

  /**
   * Send a dragon analysis post edit request.
   *
   * @param {DragonAnalysisEditPayload} payload payload for editing a dragon analysis post
   * @return {Promise<AnalysisEditResponse>} promise returned from `fetch`
   */
  static analysisEditDragon(
    payload: DragonAnalysisEditPayload,
  ): Promise<AnalysisEditResponse> {
    return ApiRequestSender.sendRequest<AnalysisEditResponse, DragonAnalysisEditPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_EDIT_DRAGON,
      payload,
    );
  }

  /**
   * Send a request to check if the ID combination for the analysis is available.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} unitId analysis unit ID
   * @param {SupportedLanguages} lang language code of the analysis post
   * @return {Promise<AnalysisIdCheckResponse>} promise returned from `fetch`
   */
  static analysisIdCheck(
    googleUid: string, unitId: number, lang: SupportedLanguages,
  ): Promise<AnalysisIdCheckResponse> {
    return ApiRequestSender.sendRequest<AnalysisIdCheckResponse, AnalysisIdCheckPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_ID_CHECK,
      {unitId, googleUid, lang},
    );
  }

  // endregion

  // region Get page meta

  /**
   * Send a request to get the post page meta.
   *
   * @param {string} googleUid Google UID
   * @param {SupportedLanguages} lang post language
   * @param {PostType} postType type of the post
   * @param {number} pid post ID
   * @return {Promise<AnalysisIdCheckResponse | FailedResponse>} promise returned from `fetch`
   */
  static getPostMeta(googleUid: string, lang: SupportedLanguages, postType: PostType, pid: number) {
    return ApiRequestSender.sendRequest<PostPageMetaResponse | FailedResponse, PostPageMetaPayload>(
      'GET',
      ApiEndPoints.PAGE_META_POST,
      {
        googleUid,
        lang,
        postType,
        postId: pid,
      },
    );
  }

  /**
   * Send a request to get the generic page meta.
   *
   * @param {string} googleUid Google UID
   * @return {Promise<AnalysisIdCheckResponse | FailedResponse>} promise returned from `fetch`
   */
  static getPageMeta(googleUid: string) {
    return ApiRequestSender.sendRequest<PageMetaResponse | FailedResponse, PageMetaPayload>(
      'GET',
      ApiEndPoints.PAGE_META_GENERAL,
      {
        googleUid,
      },
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
  static sendRequest<R extends BaseResponse, P extends RequestPayloadBase>(
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
