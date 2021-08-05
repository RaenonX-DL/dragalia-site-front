import React from 'react';

import {FailedResponse, isFailedResponse, UnitNameRefManageResponse} from '../../../../api-def/api';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useFetchState} from '../../../elements/common/fetch';
import {Loading} from '../../../elements/common/loading';
import {AccessDenied} from '../../layout/accessDenied';
import {ProtectedLayout} from '../../layout/protected';
import {UnitNameRefManagement} from './manage';


export const UnitNameRefPage = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  if (!context?.session?.user.isAdmin) {
    return <AccessDenied/>;
  }

  const uid = context.session.user.id.toString();

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
