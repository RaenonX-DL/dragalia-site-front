import {UnitType} from '../../../../../../api-def/api';

export type InputData = {
  keyword: string,
  types: Array<UnitType>,
  elements: Array<number>,
  weaponTypes: Array<number>,
}
