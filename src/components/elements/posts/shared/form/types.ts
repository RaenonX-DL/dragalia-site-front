import React from 'react';

import {PostMetaPayload, PostUpdateSuccessResponse} from '../../../../../api-def/api';

/**
 * State of a post form.
 */
export type PostFormState<P extends PostMetaPayload> = {
  payload: P,
  isIdAvailable: boolean,
  isPreloaded: boolean,
}

/**
 * Props of a post form section that only contains payload data.
 */
export type PostFormDataProps<P extends PostMetaPayload> = {
  formState: PostFormState<P>,
  setPayload: (key: keyof P, newValue: string) => void,
}

/**
 * Props of a post form section that controls the form.
 */
export type PostFormControlProps<P extends PostMetaPayload> = PostFormDataProps<P> & {
  setAvailability: (availability: boolean) => void,
}

/**
 * Props for the form that fetches some data.
 */
export type PostFormFetchProps<P extends PostMetaPayload> = {
  fnSendRequest: (payload: P) => Promise<PostUpdateSuccessResponse>,
}

/**
 * Props of the main post form.
 */
export type PostFormProps<P extends PostMetaPayload> = PostFormFetchProps<P> & {
  formState: PostFormState<P>,
  setFormState: React.Dispatch<React.SetStateAction<PostFormState<P>>>,
  renderMain?: (
    setPayload: (key: keyof P, newValue: string) => void,
    setAvailability: (availability: boolean) => void,
  ) => React.ReactNode,
  renderOnPreloaded?: (
    setPayload: (key: keyof P, newValue: string) => void,
  ) => React.ReactNode,
}

/**
 * Props of the base post form.
 */
export type PostFormBaseProps<P extends PostMetaPayload> = PostFormProps<P> & {
  renderMain: (
    setPayload: (key: keyof P, newValue: string) => void,
    setAvailability: (availability: boolean) => void,
  ) => React.ReactNode,
}
