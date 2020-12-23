import {
  AnalysisPostGetSuccessResponse,
  CharacterAnalysisPost,
  DragonAnalysisPost,
} from '../../../../utils/services/api';
import {PostFetchStatus} from '../fetch';


export interface AnalysisPostFetchStatus extends PostFetchStatus {
  post: AnalysisPostGetSuccessResponse | null
}


export interface CharacterAnalysisPostFetchStatus extends AnalysisPostFetchStatus {
  post: CharacterAnalysisPost | null
}

export interface DragonAnalysisPostFetchStatus extends AnalysisPostFetchStatus {
  post: DragonAnalysisPost | null
}
