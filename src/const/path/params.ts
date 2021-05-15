// Key name corresponds to route lookup expression
// All value types must be `string` according to the definition of `useParams()`

export type PathParams = {
  lang: string,
}

export type PostParams = PathParams & {
  pid?: string,
}

export type AnalysisParams = PostParams

export type AnalysisEditParams = AnalysisParams

export type QuestParams = PostParams

export type QuestEditParams = QuestParams
