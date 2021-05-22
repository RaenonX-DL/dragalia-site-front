import {AnalysisType} from '../../../../../../api-def/api';

export type InputData = {
  keyword: string,
  types: Array<AnalysisType>,
  elements: Array<number>,
  weaponTypes: Array<number>,
}
