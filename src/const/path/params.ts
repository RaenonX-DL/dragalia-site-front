// Key name corresponds to route lookup expression
// All value types must be `string` according to the definition of `useParams()`

import {match} from 'react-router';

export type PathParams = {
  lang: string,
}

export type PostParams = PathParams & {
  pid?: string,
}

export const isMatchPostParams = (match: any): match is match<PostParams> => {
  return match && match.params && match.params.pid;
};

export type AnalysisParams = PostParams

export type AnalysisEditParams = AnalysisParams

export type QuestParams = PostParams

export type QuestEditParams = QuestParams
