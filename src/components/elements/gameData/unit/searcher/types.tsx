import {UnitInfoData} from '../../../../../api-def/resources';
import {UnitFilterInputData} from '../filter/types';


export type UnitSearchOutputProps<S extends string, D extends UnitFilterInputData<S>> = {
  inputData: D,
  processedUnitInfo: Array<UnitInfoData>
}
