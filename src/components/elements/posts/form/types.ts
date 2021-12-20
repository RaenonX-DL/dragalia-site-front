import React from 'react';

import {PostMeta, PostEditResponse} from '../../../../api-def/api';


/**
 * State of a post form.
 */
export type PostFormState<P extends PostMeta> = {
  payload: P,
  isIdAvailable: boolean,
  isPreloaded: boolean,
};

export type PostFormSetPayloadFunc<P> = <K extends keyof P>(key: K, newValue: P[K]) => void;

/**
 * Props of a post form section that only contains payload data.
 */
export type PostFormDataProps<P extends PostMeta> = {
  formState: PostFormState<P>,
  setPayload: PostFormSetPayloadFunc<P>,
};

/**
 * Props of a post form section that controls the form.
 */
export type PostFormControlProps<P extends PostMeta> = PostFormDataProps<P> & {
  setAvailability: (availability: boolean) => void,
};

/**
 * Props for the form that fetches some data.
 */
export type PostFormFetchProps<P extends PostMeta, R extends PostEditResponse> = {
  fnSendRequest: (payload: P) => Promise<R>,
  fnProcessPayload?: (payload: P) => PromiseLike<P>,
};

/**
 * Props of the base post form.
 */
export type PostFormBaseProps<P extends PostMeta, R extends PostEditResponse> = PostFormFetchProps<P, R> & {
  formState: PostFormState<P>,
  setFormState: React.Dispatch<React.SetStateAction<PostFormState<P>>>,
  renderMain: (
    setPayload: PostFormSetPayloadFunc<P>,
    setAvailability: (availability: boolean) => void,
  ) => React.ReactElement,
  renderOnPreloaded?: (
    setPayload: PostFormSetPayloadFunc<P>,
  ) => React.ReactElement,
  onSubmitSuccess?: () => void,
  onUpdated?: (payload: P) => void,
};

/**
 * Props of the main post form.
 */
export type PostFormProps<P extends PostMeta, R extends PostEditResponse> = Pick<PostFormBaseProps<P, R>,
  'formState' | 'setFormState' | 'fnSendRequest' | 'fnProcessPayload' | 'renderOnPreloaded' | 'onSubmitSuccess' |
  'onUpdated'>;

export const isFormStateValid = <P extends PostMeta>({isIdAvailable, isPreloaded}: PostFormState<P>) => {
  return isIdAvailable || isPreloaded;
};
