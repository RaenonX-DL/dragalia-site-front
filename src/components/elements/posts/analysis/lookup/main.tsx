import React from 'react';

import {AnalysisLookupLandingResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {CookiesControl} from '../../../../../utils/cookies';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {useFetchState} from '../../../common/fetch';
import {AnalysisLookupLanding} from './in/landing';
import {AnalysisLookupInput} from './in/main';
import {InputData} from './in/types';
import {AnalysisLookupOutput} from './out/main';

export const AnalysisPostLookup = () => {
  const {lang} = useI18n();

  const [inputForward, setInputForward] = React.useState<InputData>();
  const {
    fetchStatus: lookupLanding,
    fetchFunction: fetchLookupLanding,
  } = useFetchState<AnalysisLookupLandingResponse | null>(
    null,
    () => ApiRequestSender.analysisLookupLanding(CookiesControl.getGoogleUid() || '', lang),
    'Failed to fetch the weapon type enums.',
  );

  fetchLookupLanding();

  return (
    <>
      <AnalysisLookupLanding analyses={lookupLanding.data?.analyses || []}/>
      <hr/>
      <AnalysisLookupInput
        isAdmin={lookupLanding.data?.isAdmin || false}
        onSearchRequested={(data) => () => {
          GoogleAnalytics.analysisLookup(data);
          setInputForward(data);
        }}
      />
      {inputForward && <AnalysisLookupOutput inputData={inputForward}/>}
    </>
  );
};
