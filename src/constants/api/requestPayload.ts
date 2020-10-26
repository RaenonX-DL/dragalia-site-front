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

interface QuestPostPublishPayload extends RequestPayloadBase {
  title: string,
  lang: string,
  general: string,
  video: string,
  positional: Array<PositionalInfo>,
  addendum: string,
}

interface QuestPostGetPayload extends RequestPayloadBase {
  seq_id: number,
  lang_code?: string
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
   * @return {QuestPostGetPayload} payload object
   */
  static questPostGet(googleUid: string, seqId: number, langCode: string): QuestPostGetPayload {
    return {
      google_uid: googleUid,
      seq_id: seqId,
      lang_code: langCode,
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
   * Make the payload for publishing a quest post.
   *
   * @param {string} googleUid current Google UID
   * @param {string} title title of the post
   * @param {string} langCode language code of the post
   * @param {string} generalInfo general info for the post
   * @param {string} video video of the post
   * @param {Array<PositionalInfo>} posInfo positional info in the post
   * @param {string} addendum addendum of the post
   * @return {QuestPostPublishPayload} payload object
   */
  static questPostPublish(
    googleUid: string, title: string, langCode: string, generalInfo: string, video: string,
    posInfo: Array<PositionalInfo>, addendum: string): QuestPostPublishPayload {
    return {
      google_uid: googleUid,
      title: title,
      lang: langCode,
      general: generalInfo,
      video: video,
      positional: posInfo,
      addendum: addendum,
    };
  }
}
