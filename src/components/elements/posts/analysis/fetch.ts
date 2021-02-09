import {AnalysisGetSuccessResponse, CharacterAnalysis, DragonAnalysis} from '../../../../api-def/api';
import {PostFetchStatus} from '../fetch';


export type AnalysisPostFetchStatus = PostFetchStatus & {
  post: AnalysisGetSuccessResponse | null
}


export type CharacterAnalysisPostFetchStatus = AnalysisPostFetchStatus & {
  post: CharacterAnalysis | null
}

export type DragonAnalysisPostFetchStatus = AnalysisPostFetchStatus & {
  post: DragonAnalysis | null
}
