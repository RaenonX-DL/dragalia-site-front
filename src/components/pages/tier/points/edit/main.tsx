import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {FailedResponse, isFailedResponse, KeyPointManageResponse} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useFetchState} from '../../../../elements/common/fetch';
import {Loading} from '../../../../elements/common/loading';
import {AccessDenied} from '../../../layout/accessDenied';
import {ProtectedLayout} from '../../../layout/protected';
import {KeyPointsManagement} from './form';


export const KeyPointsEdit = () => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  if (!context?.session?.user.isAdmin) {
    return <AccessDenied/>;
  }

  const uid = context.session.user.id.toString();

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
