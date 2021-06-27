import {DeepPartial} from '../../../../../utils/types';
import {InputData} from './types';


export const overwriteInputData = (original: InputData, overwrite: DeepPartial<InputData>): InputData => ({
  filter: {
    elements: overwrite?.filter?.elements ?? original.filter.elements,
    exBuffParams: overwrite?.filter?.exBuffParams ?? original.filter.exBuffParams,
    cexBuffParams: overwrite?.filter?.cexBuffParams ?? original.filter.cexBuffParams,
  },
});

export const generateInputData = (overwrite?: DeepPartial<InputData>): InputData => overwriteInputData(
  {
    // These default values will be used when initializing the parameter input for ATK skill lookup
    filter: {
      elements: [],
      exBuffParams: [],
      cexBuffParams: [],
    },
  },
  overwrite || {},
);
