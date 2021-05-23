import {UnitType} from '../../../../../api-def/api';
import {UnitInfoDataBase} from '../../../../../utils/services/resources/types';

export type UnitInfo = UnitInfoDataBase & {
  unitType: UnitType
}
