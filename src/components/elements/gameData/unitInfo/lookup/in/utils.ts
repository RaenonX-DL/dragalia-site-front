import {DeepPartial} from '../../../../../../utils/types';
import {InputData} from './types';


export const overrideInputData = (original: InputData, override: DeepPartial<InputData>): InputData => ({
  keyword: override.keyword ?? original.keyword,
  types: override.types ?? original.types,
  elements: override.elements ?? original.elements,
  weaponTypes: override.weaponTypes ?? original.weaponTypes,
  sortBy: override.sortBy ?? original.sortBy,
});

export const generateInputData = (): InputData => ({
  keyword: '',
  types: [],
  elements: [],
  weaponTypes: [],
  sortBy: 'unitId',
});
