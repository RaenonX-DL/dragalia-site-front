import {CharaInfo, DragonInfo, FuncGetUnitName, UnitInfoDataBase, UnitInfoMap} from '../../../../api-def/resources';


export type UseUnitInfoReturn = {
  charaInfo: CharaInfo,
  dragonInfo: DragonInfo,
  unitInfoMap: UnitInfoMap<number>,
  getUnitName: FuncGetUnitName,
}
