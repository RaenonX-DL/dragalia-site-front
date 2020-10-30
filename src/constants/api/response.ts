import {CharacterSkill, PositionalInfo} from './requestPayload';

// region Response Base

type BaseResponse = {
  code: number,
  success: boolean
}

// endregion

// region User controls

/**
 * Sync with `UserLoginResponse` at back.
 */
export interface UserLoginResponse extends BaseResponse {
}

// endregion

// region Post base

export type PostListEntry = {
  seqId: number | string,
  lang: string,
  viewCount: number,
  modified: string,
  published: string,
}

export type PostModifyNote = {
  timestamp: string,
  note: string
}

/**
 * Sync with `QuestPostListResponseKey` at back.
 */
export interface QuestPostListEntry extends PostListEntry {
  title: string,
}

/**
 * Sync with `ObjectAnalysisPostType` at back.
 */
export enum AnalysisPostType {
  CHARACTER = 1,
  DRAGON = 2
}

/**
 * Sync with `AnalysisPostListResponseKey` at back.
 */
export interface AnalysisPostListEntry extends PostListEntry {
  type: AnalysisPostType,
  objectName: string,
}

/**
 * Sync with `PostUpdateSuccessResponseKey` at back.
 */
export interface PostUpdateSuccessResponse extends BaseResponse {
  seqId: number
}

/**
 * Sync with `PostPublishSuccessResponseKey` at back.
 */
interface PostPublishSuccessResponse extends PostUpdateSuccessResponse {
}

/**
 * Sync with `PostListResponseKey` at back.
 */
export interface PostListResponse extends BaseResponse {
  isAdmin: boolean,
  startIdx: number,
  postCount: number,
  posts: Array<unknown>
}

/**
 * Sync with `PostGetSuccessResponseKey` at back.
 */
export interface PostGetSuccessResponse extends BaseResponse {
  isAdmin: boolean,
  seqId: string,
  lang: string,
  modified: string,
  published: string,
  modifyNotes: Array<PostModifyNote>,
  viewCount: number,
  isAltLang: boolean,
  otherLangs: Array<string>
}

/**
 * Sync with `PostEditSuccessResponseKey` at back.
 */
interface PostEditSuccessResponse extends PostUpdateSuccessResponse {
}

/**
 * Sync with `PostIDCheckResponseKey` at back.
 */
interface PostIdCheckResponse extends BaseResponse {
  isAdmin: boolean,
  available: boolean
}

// endregion

// region Quest Post

/**
 * Sync with `QuestPostPublishSuccessResponseKey` at back.
 */
export interface QuestPostPublishSuccessResponse extends PostUpdateSuccessResponse {
}

/**
 * Sync with `QuestPostListResponseKey` at back.
 */
export interface QuestPostListResponse extends PostListResponse {
  posts: Array<QuestPostListEntry>
}

/**
 * Sync with `QuestPostGetSuccessResponseKey` at back.
 */
export interface QuestPostGetSuccessResponse extends PostGetSuccessResponse {
  title: string,
  general: string,
  video: string,
  info: Array<PositionalInfo>,
  addendum: string,
}

/**
 * Sync with `QuestPostEditSuccessResponseKey` at back.
 */
export interface QuestPostEditSuccessResponse extends PostUpdateSuccessResponse {
}

/**
 * Sync with `QuestPostIDCheckResponseKey` at back.
 */
export interface QuestPostIdCheckResponse extends PostIdCheckResponse {
}

// endregion

// region Analysis Post

/**
 * Sync with `CharaAnalysisPublishSuccessResponseKey` at back.
 */
export interface CharaAnalysisPublishSuccessResponse extends PostPublishSuccessResponse {
}

/**
 * Sync with `DragonAnalysisPublishSuccessResponseKey` at back.
 */
export interface DragonAnalysisPublishSuccessResponse extends PostPublishSuccessResponse {
}

/**
 * Sync with `AnalysisPostListResponseKey` at back.
 */
export interface AnalysisPostListResponse extends PostListResponse {
  posts: Array<AnalysisPostListEntry>
}

/**
 * Sync with `AnalysisPostGetSuccessResponseKey` at back.
 */
export interface AnalysisPostGetSuccessResponse extends PostGetSuccessResponse {
  type: number,
  name: string,
  summary: string,
  summonResult: string,
  passives: string,
  normalAttacks: string,
  videos: string,
  story: string,
  keywords: string
}

/**
 * Sync with `AnalysisPostGetSuccessResponseKey` at back.
 */
export interface CharacterAnalysisPost extends AnalysisPostGetSuccessResponse {
  forceStrikes: string,
  skills: Array<CharacterSkill>,
  tipsBuilds: string
}

/**
 * Sync with `AnalysisPostGetSuccessResponseKey` at back.
 */
export interface DragonAnalysisPost extends AnalysisPostGetSuccessResponse {
  ultimate: string,
  notes: string,
  suitableCharacters: string
}

/**
 * Sync with `AnalysisPostEditSuccessResponseKey` at back.
 */
export interface AnalysisPostEditSuccessResponse extends PostEditSuccessResponse {}

/**
 * Sync with `AnalysisPostIDCheckResponseKey` at back.
 */
export interface AnalysisPostIdCheckResponse extends PostIdCheckResponse {}
