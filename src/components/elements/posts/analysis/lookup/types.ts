import {UnitType} from '../../../../../api-def/api';
import {UnitInfoDataBase} from '../../../../../api-def/resources';

export type UnitInfo = UnitInfoDataBase & {
  unitType: UnitType
}
