import {ApiResponseCode, BaseResponse, FailedResponse} from '../../api-def/api';

export const isMetaResponseFailure = (response: BaseResponse): response is FailedResponse => {
  return !!response.code && response.code !== ApiResponseCode.SUCCESS;
};

export type GetPageMetaReturn = {
  title: string,
  description: string,
}
