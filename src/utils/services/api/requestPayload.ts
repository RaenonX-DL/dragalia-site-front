/* eslint-disable camelcase */

// region Base classes

/**
 * Sync with `EPParamBase` at back.
 */
type RequestPayloadBase = {
  google_uid: string
}

/**
 * Sync with `EPPostListParamBase` at back.
 */
interface PostListPayload extends RequestPayloadBase {
  lang_code: string,
  start: number,
  limit: number
}

/**
 * Sync with `EPSinglePostParamBase` at back.
 */
interface SinglePostPayload extends RequestPayloadBase {
  seq_id?: string,
  lang?: string
}

/**
 * Sync with `EPPostModifyParamBase` at back.
 */
interface PostModifyPayload extends SinglePostPayload {
  modify_note: string
}

// endregion


// region Payload - user control

/**
 * Sync with `EPUserLoginParam` at back.
 */
export interface UserLoginPayload extends RequestPayloadBase {
  google_email: string
}

// endregion


// region Payload - quest post

export type PositionalInfo = {
  position: string,
  builds: string,
  rotations: string,
  tips: string,
}

/**
 * Sync with `EPQuestPostListParam` at back.
 */
export interface QuestPostListPayload extends PostListPayload {
}

/**
 * Sync with `EPQuestPostPublishParam` at back.
 */
export interface QuestPostPublishPayload extends SinglePostPayload {
  title: string,
  general: string,
  video: string,
  positional: Array<PositionalInfo>,
  addendum: string
}

/**
 * Sync with `EPQuestPostEditParam` at back.
 */
export interface QuestPostEditPayload extends QuestPostPublishPayload, PostModifyPayload {
}

/**
 * Sync with `EPQuestPostGetParam` at back.
 */
export interface QuestPostGetPayload extends SinglePostPayload {
  inc_count?: boolean
}

/**
 * Sync with `EPQuestPostIDCheckParam` at back.
 */
export interface QuestPostIdCheckPayload extends SinglePostPayload {
}

// endregion


// region Payload - analysis post

export type CharacterSkill = {
  name: string,
  info: string,
  rotations: string,
  tips: string
}

/**
 * Sync with `EPAnalysisPostPublishParam` at back.
 */
interface AnalysisPostPublishPayload extends SinglePostPayload {
  name: string,
  summary: string,
  summon: string,
  passives: string,
  normal_attacks: string,
  videos: string,
  story: string,
  keywords: string
}

/**
 * Sync with `EPCharaAnalysisPostPublishParam` at back.
 */
export interface CharaAnalysisPostPublishPayload extends AnalysisPostPublishPayload {
  force_strikes: string,
  skills: Array<CharacterSkill>,
  tips_builds: string
}

/**
 * Sync with `EPDragonAnalysisPostPublishParam` at back.
 */
export interface DragonAnalysisPostPublishPayload extends AnalysisPostPublishPayload {
  ultimate: string,
  notes: string,
  suitable_characters: string
}

/**
 * Sync with `EPAnalysisPostListParam` at back.
 */
export interface AnalysisPostListPayload extends PostListPayload {
}

/**
 * Sync with `EPAnalysisPostGetParam` at back.
 */
export interface AnalysisPostGetPayload extends SinglePostPayload {
  inc_count: boolean
}

/**
 * Sync with `EPCharaAnalysisPostEditParam` at back.
 */
export interface CharaAnalysisPostEditPayload extends PostModifyPayload, CharaAnalysisPostPublishPayload {
}

/**
 * Sync with `EPDragonAnalysisPostEditParam` at back.
 */
export interface DragonAnalysisPostEditPayload extends PostModifyPayload, DragonAnalysisPostPublishPayload {
}

/**
 * Sync with `EPAnalysisPostIDCheckParam` at back.
 */
export interface AnalysisPostIdCheckPayload extends SinglePostPayload {
}

// endregion
