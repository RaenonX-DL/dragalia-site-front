import React from 'react';

import {useSession} from 'next-auth/react';

import {useNextRouter} from '../../../../../utils/router';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {FetchStatusSimple, isNotFetched} from '../../../../elements/common/fetch';
import {InputPanelCommonProps} from '../../../../elements/input/panel/types';
import {InputData} from '../in/types';
import {generateInputData, overrideInputData} from '../in/utils/inputData';


export const PRESET_QUERY_NAME = 'preset';

type UseAtkSkillInputReturn = InputPanelCommonProps<InputData> & {
  getPresetStatus: FetchStatusSimple,
};

// This input data is expected to change frequently.
// Therefore, it should not be used in expensive component, such as ATK skill output,
// because every change triggers a rerender.
export const useAtkSkillInput = (onNotLoggedIn: () => void): UseAtkSkillInputReturn => {
  const {query} = useNextRouter();
  const {data, status} = useSession();
  const presetId = query[PRESET_QUERY_NAME];

  const [inputData, setInputData] = React.useState<InputData>(generateInputData());
  const [getPresetStatus, setGetPresetStatus] = React.useState<FetchStatusSimple>({
    fetched: !presetId,
    fetching: false,
  });

  if (isNotFetched(getPresetStatus)) {
    if (status === 'authenticated') {
      setGetPresetStatus({...getPresetStatus, fetched: false, fetching: true});
      ApiRequestSender.getPresetAtkSkill(data?.user.id.toString() || '', presetId as string)
        .then((response) => {
          setGetPresetStatus({
            fetched: true,
            fetching: false,
          });
          setInputData(overrideInputData(inputData, response.preset));
        });
      GoogleAnalytics.presetLoaded('atkSkill');
    } else {
      setGetPresetStatus({...getPresetStatus, fetched: true, fetching: false});
      onNotLoggedIn();
    }
  }

  return {inputData, setInputData, getPresetStatus};
};
