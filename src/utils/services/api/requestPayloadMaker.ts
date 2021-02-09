import * as Payload from '../../../api-def/api';


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
      googleUid: googleUid,
      googleEmail: googleEmail,
    };
  }

  // endregion


  // region Quest post

  /**
   * Make a payload for getting a single quest post.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {QuestPostGetPayload} payload object
   */
  static questPostGet(
    googleUid: string, seqId: number, langCode: string, increaseCount: boolean = true): Payload.QuestPostGetPayload {
    return {
      googleUid: googleUid,
      seqId: seqId,
      lang: langCode,
      incCount: increaseCount,
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
      googleUid: googleUid,
      langCode: langCode,
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
    const ret: Payload.QuestPostIdCheckPayload = {
      googleUid: googleUid,
      lang: langCode,
    };

    if (seqId) {
      ret.seqId = seqId;
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
   * @return {AnalysisListPayload} payload object
   */
  static analysisPostList(
    googleUid: string, langCode: string, start: number, limit: number): Payload.AnalysisListPayload {
    return {
      googleUid: googleUid,
      langCode: langCode,
      start: start,
      limit: limit,
    };
  }

  /**
   * Make a payload for getting a single analysis post.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {number} seqId sequential ID of the post to get
   * @param {string} langCode language code of the post to get
   * @param {boolean} increaseCount if the post view count should be increased or not
   * @return {AnalysisGetPayload} payload object
   */
  static analysisPostGet(
    googleUid: string, seqId: number, langCode: string, increaseCount: boolean = true): Payload.AnalysisGetPayload {
    return {
      googleUid: googleUid,
      seqId: seqId,
      lang: langCode,
      incCount: increaseCount,
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
    googleUid: string, seqId: number | null, langCode: string): Payload.AnalysisIdCheckPayload {
    const ret: Payload.AnalysisIdCheckPayload = {
      googleUid: googleUid,
      lang: langCode,
    };

    if (seqId) {
      ret.seqId = seqId;
    }

    return ret;
  }

  // endregion
}
