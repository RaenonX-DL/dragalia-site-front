import {AnalysisResponse} from '../../../../api-def/api';
import {PostFetchStatus} from '../fetch';


export type AnalysisPostFetchStatus<R extends AnalysisResponse = AnalysisResponse> =
  PostFetchStatus<R>
