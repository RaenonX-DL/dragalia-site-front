import {overrideObject} from '../../../../../utils/override';
import {DeepPartial} from '../../../../../utils/types';
import {InputData} from './types';


export const overrideInputData = (
  original: InputData, override: DeepPartial<InputData>,
): InputData => overrideObject(original, override);

export const generateInputData = (override?: DeepPartial<InputData>): InputData => overrideInputData(
  {
    // These default values will be used when initializing the parameter input for ATK skill lookup
    filter: {
      elements: [],
      exBuffParams: [],
      cexBuffParams: [],
    },
  },
  override || {},
);
