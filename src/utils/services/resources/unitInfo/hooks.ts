import React from 'react';

import {toUnitInfoMap} from '../../../../api-def/resources';
import {useFetchState} from '../../../../components/elements/common/fetch';
import {ResourceLoader} from '../loader';
import {UseUnitInfoReturn} from './types';


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
  };
};
