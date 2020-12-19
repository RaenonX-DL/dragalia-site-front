import {PostFetchStatus} from '../fetch';
import {QuestPostGetSuccessResponse} from '../../../../constants/api';


export interface QuestPostFetchStatus extends PostFetchStatus {
  post: QuestPostGetSuccessResponse | null
}
