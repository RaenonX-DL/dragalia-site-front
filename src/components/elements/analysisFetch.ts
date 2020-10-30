import {PostFetchStatus} from './postFetch';
import {AnalysisPostGetSuccessResponse, CharacterAnalysisPost, DragonAnalysisPost} from '../../constants/api';


export interface AnalysisPostFetchStatus extends PostFetchStatus {
  post: AnalysisPostGetSuccessResponse | null
}


export interface CharacterAnalysisPostFetchStatus extends AnalysisPostFetchStatus {
  post: CharacterAnalysisPost | null
}

export interface DragonAnalysisPostFetchStatus extends AnalysisPostFetchStatus {
  post: DragonAnalysisPost | null
}
