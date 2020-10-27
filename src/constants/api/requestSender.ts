import ApiRequestPayloadMaker, {QuestPostEditPayload, QuestPostPublishPayload} from './requestPayload';
import {ApiEndPoints} from '../api';
import {PositionalInfo, PostListEntry, PostModifyNote} from '../../components/elements';

type BaseResponse = {
  code: number,
  success: boolean
}

/**
 * Sync with `UserLoginResponse` at back.
 */
interface UserLoginResponse extends BaseResponse {}

/**
 * Sync with `QuestPostListResponseKey` at back.
 */
interface QuestPostListResponse extends BaseResponse {
  isAdmin: boolean,
  startIdx: number,
  posts: Array<PostListEntry>
}

export interface QuestPostUpdateResponse extends BaseResponse {
  isAdmin: boolean,
  seqId: number
}

interface QuestPostEditResponse extends QuestPostUpdateResponse {}

/**
 * Sync with `QuestPostPublishSuccessResponseKey` at back.
 */
interface QuestPostPublishResponse extends QuestPostUpdateResponse {}

/**
 * Sync with `QuestPostGetSuccessResponseKey` at back.
 */
export interface QuestPostGetResponse extends BaseResponse {
  isAdmin: boolean,
  seqId: string,
  title: string,
  lang: string,
  general: string,
  video: string,
  info: Array<PositionalInfo>,
  addendum: string,
  modified: string,
  published: string,
  modifyNotes: Array<PostModifyNote>,
  viewCount: number,
  isAltLang: boolean,
  otherLangs: Array<string>
}

/**
 * Sync with `QuestPostIDCheckResponseKey` at back.
 */
interface QuestPostIdCheckResponse extends BaseResponse {
  isAdmin: boolean,
  available: boolean
}

/**
 * Class for sending an API request.
 */
export default class ApiRequestSender {
  /**
   * Send a user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {Promise<UserLoginResponse>} promise returned from `fetch`
   */
  static userLogin(googleUid: string, googleEmail: string): Promise<UserLoginResponse> {
    return this.sendRequest<UserLoginResponse>(
      'POST',
      ApiEndPoints.USER_LOGIN,
      ApiRequestPayloadMaker.userLogin(googleUid, googleEmail),
    );
  }

  /**
   * Get a quest post using its sequential ID.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {Promise<QuestPostGetResponse>} promise returned from `fetch`
   */
  static questPostGet(
    googleUid: string, seqId: number, langCode: string, increaseCount?: boolean): Promise<QuestPostGetResponse> {
    return this.sendRequest<QuestPostGetResponse>(
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
    googleUid: string, langCode: string, start: number, limit: number): Promise<QuestPostListResponse> {
    return this.sendRequest<QuestPostListResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_LIST,
      ApiRequestPayloadMaker.questPostList(googleUid, langCode, start, limit),
    );
  }

  /**
   * Send a quest post publish request.
   *
   * @param {QuestPostEditPayload} payload payload for publishing a post
   * @return {Promise<QuestPostPublishResponse>} promise returned from `fetch`
   */
  static questPostPublish(payload: QuestPostPublishPayload): Promise<QuestPostPublishResponse> {
    return this.sendRequest<QuestPostPublishResponse>(
      'POST',
      ApiEndPoints.POST_QUEST_PUBLISH,
      payload,
    );
  }

  /**
   * Send a quest post edit request.
   *
   * @param {QuestPostEditPayload} payload payload for editing a post
   * @return {Promise<QuestPostPublishResponse>} promise returned from `fetch`
   */
  static questPostEdit(payload: QuestPostEditPayload): Promise<QuestPostEditResponse> {
    return this.sendRequest<QuestPostPublishResponse>(
      'POST',
      ApiEndPoints.POST_QUEST_EDIT,
      payload,
    );
  }

  /**
   * Send a request to check if the ID combination is available.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} seqId title of the post
   * @param {string} langCode language code of the post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static questPostIdCheck(
    googleUid: string, seqId: number | null, langCode: string): Promise<QuestPostIdCheckResponse> {
    return this.sendRequest<QuestPostIdCheckResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_ID_CHECK,
      ApiRequestPayloadMaker.questPostIdCheck(googleUid, seqId, langCode),
    );
  }

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
