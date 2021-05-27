import {QuestPostGetResponse} from '../../../../api-def/api';
import {PostFetchStatus} from '../fetch';


export type QuestPostFetchStatus<R extends QuestPostGetResponse = QuestPostGetResponse> =
  PostFetchStatus<R>
