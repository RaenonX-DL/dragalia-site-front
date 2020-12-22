import {QuestPostGetSuccessResponse} from '../../../../utils/services/api';
import {PostFetchStatus} from '../fetch';


export interface QuestPostFetchStatus extends PostFetchStatus {
  post: QuestPostGetSuccessResponse | null
}
