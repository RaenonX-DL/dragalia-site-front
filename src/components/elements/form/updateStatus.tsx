import React from 'react';

import {ApiResponseCode, ApiResponseCodeUtil} from '../../../api-def/api';
import {useI18n} from '../../../i18n/hook';


type Props = {
  status: ApiResponseCode | null,
}

export const UpdateStatus = ({status}: Props) => {
  const {t} = useI18n();

  if (!status) {
    return <></>;
  }

  if (ApiResponseCodeUtil.isSuccess(status)) {
    return (
      <span className="text-success">
        <i className="bi bi-cloud-check"/>&nbsp;
        {t((t) => t.game.nameRef.status.updated)}
      </span>
    );
  }

  return (
    <span className="text-danger">
      <i className="bi bi-exclamation-circle"/>&nbsp;
      {t((t) => t.game.nameRef.status.error, {error: ApiResponseCode[status]})}
    </span>
  );
};
