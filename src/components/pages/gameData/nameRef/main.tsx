import React from 'react';

import {useSession} from 'next-auth/react';

import {FailedResponse, isFailedResponse, UnitNameRefManageResponse} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useFetchState} from '../../../elements/common/fetch';
import {Loading} from '../../../elements/common/loading';
import {AccessDenied} from '../../layout/accessDenied';
import {ProtectedLayout} from '../../layout/protected';
import {UnitNameRefManagement} from './manage';


export const UnitNameRefPage = () => {
  const {lang} = useI18n();
  const {data} = useSession();

  if (!data?.user.isAdmin) {
    return <AccessDenied/>;
  }

  const uid = data.user.id.toString();

  const {
    fetchStatus: unitRefs,
    fetchFunction: fetchUnitRefs,
  } = useFetchState<UnitNameRefManageResponse | FailedResponse | undefined>(
    undefined,
    () => ApiRequestSender.getUnitNameRefManage(uid, lang),
    'Failed to fetch unit name references.',
  );

  fetchUnitRefs();

  if (!unitRefs.fetched || !unitRefs.data || isFailedResponse(unitRefs.data)) {
    return <Loading/>;
  }

  return (
    <ProtectedLayout>
      <UnitNameRefManagement
        refs={unitRefs.data.refs}
        uid={uid}
      />
    </ProtectedLayout>
  );
};
