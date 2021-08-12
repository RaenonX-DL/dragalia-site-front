import {overrideObject} from '../../../../../../utils/override';
import {DeepPartial} from '../../../../../../utils/types';
import {generateInputData as generateFilterInput} from '../../../../../elements/gameData/unit/filter/utils';
import {InputData} from './types';


export const overrideInputData = (
  original: InputData, override: DeepPartial<InputData>,
): InputData => overrideObject(original, override);

export const generateInputData = (): InputData => generateFilterInput('unitId');
