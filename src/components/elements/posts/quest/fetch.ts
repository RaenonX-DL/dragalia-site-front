import {QuestPostGetSuccessResponse} from '../../../../utils/services/api';
import {PostFetchStatus} from '../fetch';


export type QuestPostFetchStatus<R extends QuestPostGetSuccessResponse = QuestPostGetSuccessResponse> =
  PostFetchStatus<R>
