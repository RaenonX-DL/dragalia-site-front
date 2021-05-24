import {CharaInfo, DragonInfo, FuncGetUnitName, toUnitInfoMap, UnitInfoMap} from '../../../api-def/resources';
import {useFetchState} from '../../../components/elements/common/fetch';
import {ResourceLoader} from './loader';

type UseUnitInfoReturn = {
  charaInfo: CharaInfo,
  dragonInfo: DragonInfo,
  unitInfoMap: UnitInfoMap,
  getUnitName: FuncGetUnitName,
}

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

  const unitInfoMap = toUnitInfoMap(charaInfo.data, dragonInfo.data);

  return {
    charaInfo: charaInfo.data,
    dragonInfo: dragonInfo.data,
    unitInfoMap,
    getUnitName: (unitId, lang) => unitInfoMap.get(unitId)?.name[lang],
  };
};
