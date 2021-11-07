import React from 'react';

import {ApiResponseCode, ApiResponseCodeUtil} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {IconUpdated, IconUpdateFailed} from '../../../elements/common/icons';


type Props = {
  status: ApiResponseCode | null,
};

export const NameRefUpdateStatus = ({status}: Props) => {
  const {t} = useI18n();

  if (!status) {
    return <></>;
  }

  if (ApiResponseCodeUtil.isSuccess(status)) {
    return (
      <span className="text-success">
        <IconUpdated/>&nbsp;
        {t((t) => t.game.nameRef.status.updated)}
      </span>
    );
  }

  return (
    <span className="text-danger">
      <IconUpdateFailed/>&nbsp;
      {t((t) => t.game.nameRef.status.error, {error: ApiResponseCode[status]})}
    </span>
  );
};
