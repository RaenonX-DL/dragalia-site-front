/* eslint-disable camelcase */
import {PositionalInfo} from '../../components/elements';

type RequestPayloadBase = {
  google_uid: string
}

interface UserLoginPayload extends RequestPayloadBase {
  google_email: string
}

interface QuestPostListPayload extends RequestPayloadBase {
  start: number,
  limit: number
}

export interface QuestPostUpdatePayload extends RequestPayloadBase {
  seq_id?: string,
  title: string,
  lang: string,
  general: string,
  video: string,
  positional: Array<PositionalInfo>,
  addendum: string,
  modify_note?: string,
}

export interface QuestPostPublishPayload extends QuestPostUpdatePayload {
}

export interface QuestPostEditPayload extends QuestPostPublishPayload {
  seq_id: string,
  modify_note: string,
}

/**
 * Sync with `EPQuestPostGetParam` at back.
 */
interface QuestPostGetPayload extends RequestPayloadBase {
  seq_id: number,
  lang?: string,
  inc_count?: boolean
}

interface IdCheckPayload extends RequestPayloadBase {
  seq_id?: number,
  lang: string
}

/**
 * Sync with `EPQuestPostIDCheckParam` at back.
 */
interface QuestPostIdCheckPayload extends IdCheckPayload {
}

/**
 * Class for making the payload for an API request.
 */
export default class ApiRequestPayloadMaker {
  /**
   * Make the payload for user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {UserLoginPayload} payload object
   */
  static userLogin(googleUid: string, googleEmail: string): UserLoginPayload {
    return {
      google_uid: googleUid,
      google_email: googleEmail,
    };
  }

  /**
   * Make the payload for getting a single post.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {QuestPostGetPayload} payload object
   */
  static questPostGet(
    googleUid: string, seqId: number, langCode: string, increaseCount: boolean = true): QuestPostGetPayload {
    return {
      google_uid: googleUid,
      seq_id: seqId,
      lang: langCode,
      inc_count: increaseCount,
    };
  }

  /**
   * Make the payload for getting the list of query posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {QuestPostListPayload} payload object
   */
  static questPostList(googleUid: string, start: number, limit: number): QuestPostListPayload {
    return {
      google_uid: googleUid,
      start: start,
      limit: limit,
    };
  }

  /**
   * Make the payload for checking the ID availability of a quest post.
   *
   * `seqId` will only being attached to the payload if it's not `null`.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} seqId title of the post
   * @param {string} langCode language code of the post
   * @return {QuestPostIdCheckPayload} payload object
   */
  static questPostIdCheck(googleUid: string, seqId: number | null, langCode: string): QuestPostIdCheckPayload {
    const ret = {
      google_uid: googleUid,
      lang: langCode,
    };

    if (seqId) {
      ret['seq_id'] = seqId;
    }

    return ret;
  }
}
