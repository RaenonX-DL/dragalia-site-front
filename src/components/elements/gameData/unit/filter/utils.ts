import {UnitFilterInputData} from './types';


export const generateInputData = <S extends string>(sortBy: S): UnitFilterInputData<S> => ({
  keyword: '',
  types: [],
  elements: [],
  weaponTypes: [],
  sortBy,
});
