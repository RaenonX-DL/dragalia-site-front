import ApiRequestPayloadMaker from './requestPayload';
import {ApiEndPoints} from '../api';
import {PositionalInfo, PostListEntry} from '../../components/elements';

type BaseResponse = {
  code: number,
  success: boolean
}

interface UserLoginResponse extends BaseResponse {}

interface QuestPostListResponse extends BaseResponse {
  isAdmin: boolean,
  startIdx: number,
  posts: Array<PostListEntry>
}

interface QuestPostPublishResponse extends BaseResponse {
  isAdmin: boolean,
  seqId: number
}

type PostModifyNote = {
  timestamp: string,
  note: string
}

export interface QuestPostGetResponse extends BaseResponse {
  isAdmin: boolean,
  seqId: number,
  title: string,
  langCode: string,
  general: string,
  video: string,
  info: Array<PositionalInfo>,
  addendum: string,
  modified: string,
  published: string,
  modifyNotes: Array<PostModifyNote>,
  viewCount: number
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
   * @return {Promise<QuestPostGetResponse>} promise returned from `fetch`
   */
  static questPostGet(googleUid: string, seqId: number, langCode: string): Promise<QuestPostGetResponse> {
    return this.sendRequest<QuestPostGetResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_GET,
      ApiRequestPayloadMaker.questPostGet(googleUid, seqId, langCode),
    );
  }

  /**
   * Get a list of all quest posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<QuestPostListResponse>} promise returned from `fetch`
   */
  static questPostList(googleUid: string, start: number, limit: number): Promise<QuestPostListResponse> {
    return this.sendRequest<QuestPostListResponse>(
      'GET',
      ApiEndPoints.POST_QUEST_LIST,
      ApiRequestPayloadMaker.questPostList(googleUid, start, limit),
    );
  }

  /**
   * Send a quest post publish request.
   *
   * @param {string} googleUid current Google UID
   * @param {string} title title of the post
   * @param {string} langCode language code of the post
   * @param {string} generalInfo general info for the post
   * @param {string} video video of the post
   * @param {Array<PositionalInfo>} posInfo positional info in the post
   * @param {string} addendum addendum of the post
   * @return {Promise<QuestPostPublishResponse>} promise returned from `fetch`
   */
  static questPostPublish(
    googleUid: string, title: string, langCode: string, generalInfo: string, video: string,
    posInfo: Array<PositionalInfo>, addendum: string): Promise<QuestPostPublishResponse> {
    return this.sendRequest<QuestPostPublishResponse>(
      'POST',
      ApiEndPoints.POST_QUEST_PUBLISH,
      ApiRequestPayloadMaker.questPostPublish(googleUid, title, langCode, generalInfo, video, posInfo, addendum),
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
