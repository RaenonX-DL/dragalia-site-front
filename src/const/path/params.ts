// Key name corresponds to route lookup expression
// All value types must be string according to the definition of `useParams()`

export type PostParams = {
  pid?: string,
}

export type AnalysisParams = PostParams

export type AnalysisEditParams = AnalysisParams

export type QuestParams = PostParams

export type QuestEditParams = QuestParams