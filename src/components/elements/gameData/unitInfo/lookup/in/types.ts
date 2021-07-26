import {UnitInfoLookupEntry, UnitType} from '../../../../../../api-def/api';
import {UnitInfoData} from '../../../../../../api-def/resources';


export type SortOrder = 'unitId' | 'published' | 'lastModified' | 'viewCount'

export type InputData = {
  keyword: string,
  types: Array<UnitType>,
  elements: Array<number>,
  weaponTypes: Array<number>,
  sortBy: SortOrder,
}

export type UnitInfoPack = {
  lookupInfo: UnitInfoLookupEntry,
  unitInfo: UnitInfoData,
}
