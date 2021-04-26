import React from 'react';

import {PostEditPayload} from '../../../../../api-def/api';
import {FormEditNote} from './editNote';
import {PostFormDataProps} from './types';

export const PostEditCommon = <P extends PostEditPayload>({
  formState,
  setPayload,
}: PostFormDataProps<P>) => {
  return (
    <FormEditNote
      formState={formState}
      setPayload={setPayload}
    />
  );
};
