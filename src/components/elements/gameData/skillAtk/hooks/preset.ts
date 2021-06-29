import React from 'react';

import {AppReactContext} from '../../../../../context/app/main';
import {useNextRouter} from '../../../../../utils/router';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {FetchStatus, FetchStatusSimple, isNotFetched} from '../../../common/fetch';
import {InputPanelCommonProps} from '../../../input/types';
import {InputData} from '../in/types';
import {generateInputData, overwriteInputData} from '../in/utils/inputData';


export const PRESET_QUERY_NAME = 'preset';

type UseAtkSkillInputReturn = InputPanelCommonProps<InputData> & {
  getPresetStatus: FetchStatusSimple,
  setPresetStatus: FetchStatusSimple,
  makePreset: (inputData: InputData) => void,
}

export const useAtkSkillInput = (onNotLoggedIn: () => void): UseAtkSkillInputReturn => {
  const {query} = useNextRouter();
  const presetId = query[PRESET_QUERY_NAME];

  const context = React.useContext(AppReactContext);

  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus<InputData>>({
    fetched: !presetId,
    fetching: false,
    data: generateInputData(),
  });
  const [makePresetStatus, setMakePresetStatus] = React.useState<FetchStatus<string | null>>({
    fetched: false,
    fetching: false,
    data: null,
  });

  if (isNotFetched(fetchStatus)) {
    if (context?.session) {
      setFetchStatus({...fetchStatus, fetching: true});
      ApiRequestSender.getPresetAtkSkill(context.session.user.id.toString(), presetId as string)
        .then((response) => {
          setFetchStatus({
            fetched: true,
            fetching: false,
            data: overwriteInputData(fetchStatus.data, response.preset),
          });
        });
      GoogleAnalytics.presetLoaded('atkSkill');
    } else {
      setFetchStatus({...fetchStatus, fetched: true, fetching: false});
      onNotLoggedIn();
    }
  }

  const makePreset = (inputData: InputData) => {
    setMakePresetStatus({...makePresetStatus, fetched: false, fetching: true});
    if (context?.session) {
      ApiRequestSender.setPresetAtkSkill(context.session.user.id.toString(), inputData)
        .then((response) => {
          setMakePresetStatus({fetched: true, fetching: false, data: response.presetId});
        });
    } else {
      onNotLoggedIn();
      setMakePresetStatus({...makePresetStatus, fetched: true, fetching: false});
    }
  };

  return {
    inputData: fetchStatus.data,
    setInputData: (newData: InputData) => setFetchStatus({...fetchStatus, data: newData}),
    getPresetStatus: fetchStatus,
    setPresetStatus: makePresetStatus,
    makePreset,
  };
};
