import React from 'react';

import {ApiResponseCode} from '../../../../api-def/api';
import {toUnitInfoMap} from '../../../../api-def/resources';
import {useFetchState} from '../../../../components/elements/common/fetch';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../api/requestSender';
import {ResourceLoader} from '../loader';
import {UseUnitDataReturn, UseUnitInfoReturn} from './types';


export const useUnitInfo = (): UseUnitInfoReturn => {
  const {
    fetchStatus: charaInfo,
    fetchFunction: fetchCharaInfo,
  } = useFetchState(
    [],
    ResourceLoader.getCharacterInfo,
    'Failed to fetch character info.',
  );
  const {
    fetchStatus: dragonInfo,
    fetchFunction: fetchDragonInfo,
  } = useFetchState(
    [],
    ResourceLoader.getDragonInfo,
    'Failed to fetch dragon info.',
  );

  fetchCharaInfo();
  fetchDragonInfo();

  const unitInfoMap = React.useMemo(
    () => toUnitInfoMap(charaInfo.data, dragonInfo.data, (info) => info.id),
    [charaInfo, dragonInfo],
  );

  return {
    charaInfo: charaInfo.data,
    dragonInfo: dragonInfo.data,
    unitInfoMap,
    getUnitName: (unitId, lang) => unitInfoMap.get(unitId)?.name[lang],
    isFetched: charaInfo.fetched && dragonInfo.fetched,
  };
};

export const useUnitData = (): UseUnitDataReturn => {
  const {lang} = useI18n();

  const {
    fetchStatus: unitNameRef,
    fetchFunction: fetchUnitNameRef,
  } = useFetchState(
    {code: ApiResponseCode.NOT_EXECUTED, success: false, data: {}},
    () => ApiRequestSender.getUnitNameReferences(lang),
    'Failed to fetch unit name references.',
  );

  fetchUnitNameRef();

  return {
    nameRef: unitNameRef.data.data,
  };
};
