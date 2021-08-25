import {UnitNameRefData} from '../../../../api-def/api';
import {CharaInfo, DragonInfo, FuncGetUnitName, UnitInfoMap} from '../../../../api-def/resources';


export type UseUnitInfoReturn = {
  charaInfo: CharaInfo,
  dragonInfo: DragonInfo,
  unitInfoMap: UnitInfoMap<number>,
  getUnitName: FuncGetUnitName,
}

export type UseUnitDataReturn = {
  nameRef: UnitNameRefData,
}
