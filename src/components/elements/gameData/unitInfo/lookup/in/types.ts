import {UnitType} from '../../../../../../api-def/api';


export type SortOrder = 'unitId' | 'published' | 'lastModified' | 'viewCount'

export type InputData = {
  keyword: string,
  types: Array<UnitType>,
  elements: Array<number>,
  weaponTypes: Array<number>,
  sortBy: SortOrder,
}
