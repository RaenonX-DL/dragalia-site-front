import * as Payload from './requestPayload';


/**
 * Class for making the payload for an API request.
 */
export default class ApiRequestPayloadMaker {
  // region User control

  /**
   * Make the payload for user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {UserLoginPayload} payload object
   */
  static userLogin(googleUid: string, googleEmail: string): Payload.UserLoginPayload {
    return {
      google_uid: googleUid,
      google_email: googleEmail,
    };
  }

  // endregion


  // region Quest post

  /**
   * Make a payload for getting a single quest post.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {QuestPostGetPayload} payload object
   */
  static questPostGet(
    googleUid: string, seqId: string, langCode: string, increaseCount: boolean = true): Payload.QuestPostGetPayload {
    return {
      google_uid: googleUid,
      seq_id: seqId,
      lang: langCode,
      inc_count: increaseCount,
    };
  }

  /**
   * Make a payload for getting the list of quest posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} langCode language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {QuestPostListPayload} payload object
   */
  static questPostList(
    googleUid: string, langCode: string, start: number, limit: number): Payload.QuestPostListPayload {
    return {
      google_uid: googleUid,
      lang_code: langCode,
      start: start,
      limit: limit,
    };
  }

  /**
   * Make a payload for checking the ID availability of a quest post.
   *
   * `seqId` will only being attached to the payload if it's not `null`.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} seqId title of the post
   * @param {string} langCode language code of the post
   * @return {QuestPostIdCheckPayload} payload object
   */
  static questPostIdCheck(googleUid: string, seqId: number | null, langCode: string): Payload.QuestPostIdCheckPayload {
    const ret = {
      google_uid: googleUid,
      lang: langCode,
    };

    if (seqId) {
      ret['seq_id'] = seqId;
    }

    return ret;
  }

  // endregion


  // region Analysis post

  /**
   * Make a payload for getting the list of analysis posts.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} langCode language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {QuestPostListPayload} payload object
   */
  static analysisPostList(
    googleUid: string, langCode: string, start: number, limit: number): Payload.AnalysisPostListPayload {
    return {
      google_uid: googleUid,
      lang_code: langCode,
      start: start,
      limit: limit,
    };
  }

  /**
   * Make a payload for getting a single analysis post.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {AnalysisPostGetPayload} payload object
   */
  static analysisPostGet(
    googleUid: string, seqId: string, langCode: string, increaseCount: boolean = true): Payload.AnalysisPostGetPayload {
    return {
      google_uid: googleUid,
      seq_id: seqId,
      lang: langCode,
      inc_count: increaseCount,
    };
  }

  /**
   * Make a payload for checking the ID availability of an analysis post.
   *
   * `seqId` will only being attached to the payload if it's not `null`.
   *
   * @param {string} googleUid current Google UID
   * @param {number | null} seqId title of the post
   * @param {string} langCode language code of the post
   * @return {QuestPostIdCheckPayload} payload object
   */
  static analysisPostIdCheck(
    googleUid: string, seqId: number | null, langCode: string): Payload.AnalysisPostIdCheckPayload {
    const ret = {
      google_uid: googleUid,
      lang: langCode,
    };

    if (seqId) {
      ret['seq_id'] = seqId;
    }

    return ret;
  }

  // endregion
}
