import {CharaInfo, DragonInfo, FuncGetUnitName, UnitInfoMap} from '../../../../api-def/resources';


export type UseUnitInfoReturn = {
  charaInfo: CharaInfo,
  dragonInfo: DragonInfo,
  unitInfoMap: UnitInfoMap,
  getUnitName: FuncGetUnitName,
}
