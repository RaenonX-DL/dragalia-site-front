import {UnitType} from '../../../../../api-def/api';


export type UnitFilterInputData<S extends string> = {
  keyword: string,
  types: Array<UnitType>,
  elements: Array<number>,
  weaponTypes: Array<number>,
  sortBy: S,
}
