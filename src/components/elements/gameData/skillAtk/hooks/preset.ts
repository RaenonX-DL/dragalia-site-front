import React from 'react';

import {AppReactContext} from '../../../../../context/app/main';
import {useNextRouter} from '../../../../../utils/router';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {FetchStatusSimple, isNotFetched} from '../../../common/fetch';
import {InputPanelCommonProps} from '../../../input/types';
import {InputData} from '../in/types';
import {generateInputData, overwriteInputData} from '../in/utils/inputData';


export const PRESET_QUERY_NAME = 'preset';

type UseAtkSkillInputReturn = InputPanelCommonProps<InputData> & {
  getPresetStatus: FetchStatusSimple,
}

// This input data is expect to change frequently.
// Therefore, it should not be used in expensive component, such as ATK skill output,
// because every change triggers a re-render.
export const useAtkSkillInput = (onNotLoggedIn: () => void): UseAtkSkillInputReturn => {
  const {query} = useNextRouter();
  const presetId = query[PRESET_QUERY_NAME];

  const context = React.useContext(AppReactContext);

  const [inputData, setInputData] = React.useState<InputData>(generateInputData());
  const [getPresetStatus, setGetPresetStatus] = React.useState<FetchStatusSimple>({
    fetched: !presetId,
    fetching: false,
  });

  if (isNotFetched(getPresetStatus)) {
    if (context?.session) {
      setGetPresetStatus({...getPresetStatus, fetching: true});
      ApiRequestSender.getPresetAtkSkill(context.session.user.id.toString(), presetId as string)
        .then((response) => {
          setGetPresetStatus({
            fetched: true,
            fetching: false,
          });
          setInputData(overwriteInputData(inputData, response.preset));
        });
      GoogleAnalytics.presetLoaded('atkSkill');
    } else {
      setGetPresetStatus({...getPresetStatus, fetched: true, fetching: false});
      onNotLoggedIn();
    }
  }

  return {inputData, setInputData, getPresetStatus};
};
