import fetch from 'node-fetch';

import {
  AnalysisEditResponse,
  AnalysisGetPayload,
  AnalysisGetResponse,
  AnalysisIdCheckPayload,
  AnalysisIdCheckResponse,
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
  GetAtkSkillPresetPayload,
  GetAtkSkillPresetResponse,
  KeyPointEntryUpdate,
  KeyPointGetPayload,
  KeyPointGetResponse,
  KeyPointManagePayload,
  KeyPointManageResponse,
  KeyPointUpdatePayload,
  KeyPointUpdateResponse,
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
  SetAtkSkillPresetPayload,
  SetAtkSkillPresetResponse,
  SupportedLanguages,
  UnitInfoLookupLandingPayload,
  UnitInfoLookupLandingResponse,
  UnitInfoLookupPayload,
  UnitInfoLookupResponse,
  UnitNameRefManagePayload,
  UnitNameRefManageResponse,
  UnitNameRefPayload,
  UnitNameRefResponse,
  UnitNameRefUpdatePayload,
  UnitNameRefUpdateResponse,
  UnitPageMetaPayload,
  UnitPageMetaResponse,
  UnitType,
} from '../../../api-def/api';
import {InputData as AtkSkillInput} from '../../../components/pages/gameData/skillAtk/in/types';
import {FetchPostOptions} from './types';
import {getFullApiUrl} from './utils';


/**
 * Class for sending an API request.
 */
export class ApiRequestSender {
  // region Quest posts

  /**
   * Get a quest post using its sequential ID.
   *
   * @param {FetchPostOptions} options options to get a quest post
   * @return {Promise<QuestPostGetResponse>} promise returned from `fetch`
   */
  static questGet({uid, postId, lang, incCount}: FetchPostOptions<number>): Promise<QuestPostGetResponse> {
    return ApiRequestSender.sendRequest<QuestPostGetResponse, QuestPostGetPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_GET,
      {uid, seqId: postId, lang, incCount},
    );
  }

  /**
   * Get a list of all quest posts.
   *
   * @param {string} uid UID of the logged in user
   * @param {SupportedLanguages} lang language code of the posts
   * @param {number} start starting index of the posts
   * @param {number} limit maximum count of the data to be returned
   * @return {Promise<QuestPostListResponse>} promise returned from `fetch`
   */
  static questList(
    uid: string, lang: SupportedLanguages, start: number, limit: number,
  ): Promise<QuestPostListResponse> {
    return ApiRequestSender.sendRequest<QuestPostListResponse, QuestPostListPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_LIST,
      {uid, lang, start, limit},
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
   * @param {string} uid current UID
   * @param {number | null} seqId title of the post
   * @param {SupportedLanguages} lang language code of the quest post
   * @return {Promise<QuestPostIdCheckResponse>} promise returned from `fetch`
   */
  static questIdCheck(
    uid: string, seqId: number | null, lang: SupportedLanguages,
  ): Promise<QuestPostIdCheckResponse> {
    return ApiRequestSender.sendRequest<QuestPostIdCheckResponse, QuestPostIdCheckPayload>(
      'GET',
      ApiEndPoints.POST_QUEST_ID_CHECK,
      {seqId: seqId || undefined, uid, lang},
    );
  }

  // endregion

  // region Analyses

  /**
   * Send a character analysis post publish request.
   *
   * @param {CharaAnalysisPublishPayload} payload payload of a character analysis post
   * @return {Promise<AnalysisPublishResponse>} promise returned from `fetch`
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
   * @param {string} uid user ID to get the analysis lookup
   * @param {SupportedLanguages} lang language to use for getting the analysis info
   * @return {Promise<UnitInfoLookupResponse>} promise returned from `fetch`
   */
  static analysisLookup(uid: string, lang: SupportedLanguages): Promise<UnitInfoLookupResponse> {
    return ApiRequestSender.sendRequest<UnitInfoLookupResponse, UnitInfoLookupPayload>(
      'GET',
      ApiEndPoints.INFO_UNIT_LOOKUP,
      {uid, lang},
    );
  }

  /**
   * Send an unit info lookup info request on landing.
   *
   * @param {string} uid user ID to get the unit info lookup
   * @param {SupportedLanguages} lang language to use for getting the unit info lookup
   * @return {Promise<UnitInfoLookupLandingResponse>} promise returned from `fetch`
   */
  static unitInfoLookupLanding(uid: string, lang: SupportedLanguages): Promise<UnitInfoLookupLandingResponse> {
    return ApiRequestSender.sendRequest<UnitInfoLookupLandingResponse, UnitInfoLookupLandingPayload>(
      'GET',
      ApiEndPoints.INFO_UNIT_LOOKUP_LANDING,
      {uid, lang},
    );
  }

  /**
   * Get an analysis post using its unit ID.
   *
   * @param {FetchPostOptions} options options to get an analysis
   * @return {Promise<AnalysisResponse>} promise returned from `fetch`
   */
  static analysisGet({uid, lang, postId, incCount}: FetchPostOptions<number | string>): Promise<AnalysisResponse> {
    return ApiRequestSender.sendRequest<AnalysisGetResponse, AnalysisGetPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_GET,
      {uid, lang, unitId: postId, incCount},
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
  static analysisEditChara(payload: CharaAnalysisEditPayload): Promise<AnalysisEditResponse> {
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
  static analysisEditDragon(payload: DragonAnalysisEditPayload): Promise<AnalysisEditResponse> {
    return ApiRequestSender.sendRequest<AnalysisEditResponse, DragonAnalysisEditPayload>(
      'POST',
      ApiEndPoints.POST_ANALYSIS_EDIT_DRAGON,
      payload,
    );
  }

  /**
   * Send a request to check if the ID combination for the analysis is available.
   *
   * @param {string} uid current UID
   * @param {number | null} unitId analysis unit ID
   * @param {SupportedLanguages} lang language code of the analysis post
   * @return {Promise<AnalysisIdCheckResponse>} promise returned from `fetch`
   */
  static analysisIdCheck(uid: string, unitId: number, lang: SupportedLanguages): Promise<AnalysisIdCheckResponse> {
    return ApiRequestSender.sendRequest<AnalysisIdCheckResponse, AnalysisIdCheckPayload>(
      'GET',
      ApiEndPoints.POST_ANALYSIS_ID_CHECK,
      {unitId, uid, lang},
    );
  }

  // endregion

  // region Page meta

  /**
   * Send a request to get the post page meta.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang post language
   * @param {PostType} postType type of the post
   * @param {number | string} postIdentifier post identifier
   * @return {Promise<PostPageMetaResponse | FailedResponse>} promise returned from `fetch`
   */
  static getPostMeta(uid: string, lang: SupportedLanguages, postType: PostType, postIdentifier: number | string) {
    return ApiRequestSender.sendRequest<PostPageMetaResponse | FailedResponse, PostPageMetaPayload>(
      'GET',
      ApiEndPoints.PAGE_META_POST,
      {uid, lang, postType, postIdentifier},
    );
  }

  /**
   * Send a request to get the unit page meta.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang post language
   * @param {number | string} unitIdentifier post identifier
   * @return {Promise<UnitPageMetaResponse | FailedResponse>} promise returned from `fetch`
   */
  static getUnitMeta(uid: string, lang: SupportedLanguages, unitIdentifier: number | string) {
    return ApiRequestSender.sendRequest<UnitPageMetaResponse | FailedResponse, UnitPageMetaPayload>(
      'GET',
      ApiEndPoints.PAGE_META_UNIT,
      {uid, lang, unitIdentifier},
    );
  }

  /**
   * Send a request to get the generic page meta.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang current page language
   * @return {Promise<PageMetaResponse | FailedResponse>} promise returned from `fetch`
   */
  static getPageMeta(uid: string, lang: SupportedLanguages) {
    return ApiRequestSender.sendRequest<PageMetaResponse | FailedResponse, PageMetaPayload>(
      'GET',
      ApiEndPoints.PAGE_META_GENERAL,
      {uid, lang},
    );
  }

  // endregion

  // region Data

  /**
   * Send a request to get all unit name references.
   *
   * Note that this request is always anonymous (UID sent is an empty string).
   *
   * @param {SupportedLanguages} lang language of the name
   * @return {Promise<UnitNameRefResponse>} promise returned from `fetch`
   */
  static getUnitNameReferences(lang: SupportedLanguages) {
    return ApiRequestSender.sendRequest<UnitNameRefResponse, UnitNameRefPayload>(
      'GET',
      ApiEndPoints.DATA_UNIT_NAME_REF,
      {uid: '', lang},
    );
  }

  /**
   * Get all unit name references in a certain ``lang`` to update.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang language to get the unit name references
   * @return {Promise<UnitNameRefManageResponse | FailedResponse>} promise returned from `fetch`
   */
  static getUnitNameRefManage(uid: string, lang: SupportedLanguages) {
    return ApiRequestSender.sendRequest<UnitNameRefManageResponse | FailedResponse, UnitNameRefManagePayload>(
      'GET',
      ApiEndPoints.MANAGE_UNIT_NAME_REF,
      {uid, lang},
    );
  }

  /**
   * Update all unit name references in a certain ``lang``.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang language to get the unit name references
   * @param {Array<UnitNameRefEntry>} refs all unit name references in a certain language
   * @return {Promise<UnitNameRefUpdateResponse | FailedResponse>} promise returned from `fetch`
   */
  static updateUnitNameRefs(uid: string, lang: SupportedLanguages, refs: UnitNameRefManageResponse['refs']) {
    return ApiRequestSender.sendRequest<UnitNameRefUpdateResponse | FailedResponse, UnitNameRefUpdatePayload>(
      'POST',
      ApiEndPoints.MANAGE_UNIT_NAME_REF,
      {uid, lang, refs},
    );
  }

  // endregion

  // region Preset

  /**
   * Send a request to get an ATK skill input data preset.
   *
   * @param {string} uid user ID
   * @param {string} presetId input preset ID
   * @return {Promise<GetAtkSkillPresetResponse>} promise returned from `fetch`
   */
  static getPresetAtkSkill(uid: string, presetId: string) {
    return ApiRequestSender.sendRequest<GetAtkSkillPresetResponse, GetAtkSkillPresetPayload>(
      'GET',
      ApiEndPoints.PRESET_ATK_SKILL_INPUT,
      {uid, presetId},
    );
  }

  /**
   * Send a request to create an ATK skill input data preset.
   *
   * @param {string} uid user ID
   * @param {AtkSkillInput} preset ATK skill input data
   * @return {Promise<SetAtkSkillPresetResponse>} promise returned from `fetch`
   */
  static setPresetAtkSkill(uid: string, preset: AtkSkillInput) {
    return ApiRequestSender.sendRequest<SetAtkSkillPresetResponse, SetAtkSkillPresetPayload>(
      'POST',
      ApiEndPoints.PRESET_ATK_SKILL_INPUT,
      {uid, preset},
    );
  }

  // endregion

  // region Tier List

  /**
   * Get unit key point data.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang language of the key point entries
   * @return {Promise<KeyPointManageResponse>} promise returned from `fetch`
   */
  static getKeyPointsData(uid: string, lang: SupportedLanguages) {
    return ApiRequestSender.sendRequest<KeyPointGetResponse, KeyPointGetPayload>(
      'GET',
      ApiEndPoints.TIER_KEY_POINTS,
      {uid, lang},
    );
  }

  /**
   * Get all key point entries for update.
   *
   * This returns the entries in `lang`.
   * If there are no corresponding content in `lang`, return the content in `cht` > `en` > `jp` instead.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang language of the key point entries
   * @return {Promise<KeyPointManageResponse>} promise returned from `fetch`
   */
  static getKeyPointsManage(uid: string, lang: SupportedLanguages) {
    return ApiRequestSender.sendRequest<KeyPointManageResponse, KeyPointManagePayload>(
      'GET',
      ApiEndPoints.MANAGE_TIER_POINTS,
      {uid, lang},
    );
  }

  /**
   * Update the content of key point entries.
   *
   * @param {string} uid user ID
   * @param {SupportedLanguages} lang language of the key point entries to update
   * @param {Array<KeyPointEntryUpdate>} points update key point entries
   * @return {Promise<KeyPointUpdateResponse>} promise returned from `fetch`
   */
  static updateKeyPointContent(uid: string, lang: SupportedLanguages, points: Array<KeyPointEntryUpdate>) {
    return ApiRequestSender.sendRequest<KeyPointUpdateResponse | FailedResponse, KeyPointUpdatePayload>(
      'POST',
      ApiEndPoints.MANAGE_TIER_POINTS,
      {uid, lang, points},
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

    if (!process.env.CI) {
      console.debug(`[API] Sending ${method} request to ${endpoint}`);
    }

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
