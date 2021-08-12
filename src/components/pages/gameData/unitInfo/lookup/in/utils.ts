import {generateInputData as generateFilterInput} from '../../../../../elements/gameData/unit/filter/utils';
import {InputData} from './types';


export const generateInputData = (): InputData => generateFilterInput('unitId');
