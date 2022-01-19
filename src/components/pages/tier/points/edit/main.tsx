import React from 'react';

import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';

import {FailedResponse, isFailedResponse, KeyPointManageResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useFetchState} from '../../../../elements/common/fetch';
import {Loading} from '../../../../elements/common/loading';
import {AccessDenied} from '../../../layout/accessDenied';
import {ProtectedLayout} from '../../../layout/protected';
import {KeyPointsManagement} from './form';


export const KeyPointsEdit = () => {
  const {t, lang} = useI18n();
  const {data} = useSession();

  if (!data?.user.isAdmin) {
    return <AccessDenied/>;
  }

  const uid = data.user.id.toString();

  const {
    fetchStatus: keyPoints,
    fetchFunction: fetchKeyPoints,
  } = useFetchState<KeyPointManageResponse | FailedResponse | undefined>(
    undefined,
    () => ApiRequestSender.getKeyPointsManage(uid, lang),
    'Failed to fetch key point contents.',
  );

  fetchKeyPoints();

  if (!keyPoints.fetched || !keyPoints.data || isFailedResponse(keyPoints.data)) {
    return <Loading/>;
  }

  return (
    <ProtectedLayout>
      <Alert variant="warning">
        {t((t) => t.game.unitTier.alert.refRemoval)}
      </Alert>
      <KeyPointsManagement points={keyPoints.data.points} uid={uid}/>
    </ProtectedLayout>
  );
};
