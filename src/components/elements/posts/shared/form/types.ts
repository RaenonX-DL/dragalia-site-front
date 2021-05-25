import React from 'react';

import {PostMeta, PostEditResponse} from '../../../../../api-def/api';

/**
 * State of a post form.
 */
export type PostFormState<P extends PostMeta> = {
  payload: P,
  isIdAvailable: boolean,
  isPreloaded: boolean,
}

/**
 * Props of a post form section that only contains payload data.
 */
export type PostFormDataProps<P extends PostMeta> = {
  formState: PostFormState<P>,
  setPayload: (key: keyof P, newValue: string) => void,
}

/**
 * Props of a post form section that controls the form.
 */
export type PostFormControlProps<P extends PostMeta> = PostFormDataProps<P> & {
  setAvailability: (availability: boolean) => void,
}

/**
 * Props for the form that fetches some data.
 */
export type PostFormFetchProps<P extends PostMeta, R extends PostEditResponse> = {
  fnSendRequest: (payload: P) => Promise<R>,
}

/**
 * Props of the main post form.
 */
export type PostFormProps<P extends PostMeta, R extends PostEditResponse> = PostFormFetchProps<P, R> & {
  formState: PostFormState<P>,
  setFormState: React.Dispatch<React.SetStateAction<PostFormState<P>>>,
  renderMain?: (
    setPayload: (key: keyof P, newValue: string) => void,
    setAvailability: (availability: boolean) => void,
  ) => React.ReactElement,
  renderOnPreloaded?: (
    setPayload: (key: keyof P, newValue: string) => void,
  ) => React.ReactElement,
}

/**
 * Props of the base post form.
 */
export type PostFormBaseProps<P extends PostMeta, R extends PostEditResponse> = PostFormProps<P, R> & {
  renderMain: (
    setPayload: (key: keyof P, newValue: string) => void,
    setAvailability: (availability: boolean) => void,
  ) => React.ReactElement,
}

export const isFormStateValid = <P extends PostMeta>({isIdAvailable, isPreloaded}: PostFormState<P>) => {
  return isIdAvailable || isPreloaded;
};
