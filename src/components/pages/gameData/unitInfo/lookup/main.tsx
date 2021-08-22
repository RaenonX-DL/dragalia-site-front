import React from 'react';

import {UnitInfoLookupLandingResponse} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {useFetchState} from '../../../../elements/common/fetch';
import {UnitInfoLookupLanding} from './in/landing';
import {UnitInfoLookupInput} from './in/main';
import {InputData} from './in/types';
import {UnitInfoLookupOutput} from './out/main';


export const UnitInfoLookup = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const [inputForward, setInputForward] = React.useState<InputData>();
  const {
    fetchStatus: lookupLanding,
    fetchFunction: fetchLookupLanding,
  } = useFetchState<UnitInfoLookupLandingResponse | null>(
    null,
    () => ApiRequestSender.unitInfoLookupLanding(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch the weapon type enums.',
  );

  fetchLookupLanding();

  return (
    <>
      <UnitInfoLookupLanding analyses={lookupLanding.data?.analyses || []}/>
      <hr/>
      <UnitInfoLookupInput
        onSearchRequested={(data) => () => {
          GoogleAnalytics.analysisLookup(data);
          setInputForward(data);
        }}
      />
      <UnitInfoLookupOutput inputData={inputForward}/>
    </>
  );
};
