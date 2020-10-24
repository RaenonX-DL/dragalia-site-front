import {PositionalInfo} from '../../components/elements/questNewPostForm';

/**
 * Class for making the payload for an API request.
 */
export default class ApiRequestPayloadMaker {
  /**
   * Make the payload for user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {string} JSON payload in string
   */
  static userLogin(googleUid: string, googleEmail: string): string {
    return JSON.stringify({
      google_uid: googleUid,
      google_email: googleEmail,
    });
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
   * @return {string} JSON payload in string
   */
  static publishQuestPost(
    googleUid: string, title: string, langCode: string, generalInfo: string, video: string,
    posInfo: Array<PositionalInfo>, addendum: string) {
    return JSON.stringify({
      google_uid: googleUid,
      title: title,
      lang: langCode,
      general: generalInfo,
      video: video,
      positional: posInfo,
      addendum: addendum,
    });
  }
}
