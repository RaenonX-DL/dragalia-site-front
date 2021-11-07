import React from 'react';

import {KeyPointData, KeyPointGetResponse} from '../../../api-def/api';
import {AppReactContext} from '../../../context/app/main';
import {useI18n} from '../../../i18n/hook';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {useFetchStateProcessed} from '../../elements/common/fetch';


type UseKeyPointDataReturn = {
  keyPointData: KeyPointData,
  isFetched: boolean,
};

export const useKeyPointData = (): UseKeyPointDataReturn => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {
    fetchStatus: keyPointData,
    fetchFunction: fetchKeyPointData,
  } = useFetchStateProcessed<KeyPointData, KeyPointGetResponse>(
    {},
    () => ApiRequestSender.getKeyPointsData(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch the unit key point data.',
    (response) => response.data,
  );

  fetchKeyPointData();

  return {
    keyPointData: keyPointData.data,
    isFetched: keyPointData.fetched,
  };
};
