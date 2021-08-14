import React from 'react';

import {ApiResponseCode, KeyPointGetResponse} from '../../../api-def/api';
import {AppReactContext} from '../../../context/app/main';
import {useI18n} from '../../../i18n/hook';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {useFetchState} from '../../elements/common/fetch';
import {UnitFilter} from '../../elements/gameData/unit/filter/main';
import {orderName} from './const';
import {unitTierData} from './mock';
import {TierListOutput} from './out/main';
import {InputData} from './types';
import {generateInputData} from './utils';


export const TierList = () => {
  const {lang} = useI18n();
  const [inputData, setInputData] = React.useState<InputData>();

  const context = React.useContext(AppReactContext);

  const {
    fetchStatus: keyPointResponse,
    fetchFunction: fetchKeyPointData,
  } = useFetchState<KeyPointGetResponse>(
    {
      code: ApiResponseCode.NOT_EXECUTED,
      success: false,
      data: {},
    },
    () => ApiRequestSender.getKeyPointsData(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch the unit key point data.',
  );

  fetchKeyPointData();

  return (
    <>
      <UnitFilter
        onSearchRequested={(inputData) => () => setInputData(inputData)}
        sortOrderNames={orderName}
        generateInputData={generateInputData}
      />
      <hr/>
      {
        inputData &&
        <TierListOutput inputData={inputData} tierData={unitTierData} keyPointsData={keyPointResponse.data.data}/>
      }
    </>
  );
};
