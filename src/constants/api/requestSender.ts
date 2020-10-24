import ApiRequestPayloadMaker from './requestPayload';
import ApiEndPoints from '../api/endpoints';
import {PositionalInfo} from '../../components/elements/questNewPostForm';

/**
 * Class for sending an API request.
 */
export default class ApiRequestSender {
  /**
   * Send a user login request.
   *
   * @param {string} googleUid Google UID of the logged in user
   * @param {string} googleEmail Google email of the logged in user
   * @return {Promise<Response>} promise returned from `fetch`
   */
  static userLogin(googleUid: string, googleEmail: string): Promise<Response> {
    return this.sendRequest(
      'POST',
      ApiEndPoints.USER_LOGIN,
      ApiRequestPayloadMaker.userLogin(googleUid, googleEmail),
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
   * @return {Promise<Response>} promise returned from `fetch`
   */
  static publishQuestPost(
    googleUid: string, title: string, langCode: string, generalInfo: string, video: string,
    posInfo: Array<PositionalInfo>, addendum: string): Promise<Response> {
    return this.sendRequest(
      'POST',
      ApiEndPoints.POST_QUEST_PUBLISH,
      ApiRequestPayloadMaker.publishQuestPost(googleUid, title, langCode, generalInfo, video, posInfo, addendum),
    );
  }

  /**
   * Base method to send an API request.
   *
   * @param {string} method http method
   * @param {string} endpoint destination to send the request
   * @param {string} body data body
   * @return {Promise<Response>} promise returned from `fetch`
   */
  private static sendRequest(method: 'GET' | 'POST', endpoint: string, body: string): Promise<Response> {
    return fetch(endpoint, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: body,
    });
  }
}
