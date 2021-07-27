import {overrideObject} from '../../../../../../utils/override';
import {DeepPartial} from '../../../../../../utils/types';
import {InputData} from './types';


export const overrideInputData = (
  original: InputData, override: DeepPartial<InputData>,
): InputData => overrideObject(original, override);

export const generateInputData = (): InputData => ({
  keyword: '',
  types: [],
  elements: [],
  weaponTypes: [],
  sortBy: 'unitId',
});
