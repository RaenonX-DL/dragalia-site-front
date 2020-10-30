import {PostFetchStatus} from './postFetch';
import {QuestPostGetSuccessResponse} from '../../constants/api';


export interface QuestPostFetchStatus extends PostFetchStatus {
  post: QuestPostGetSuccessResponse | null
}
