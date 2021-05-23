import {AnalysisListEntry, UnitType} from '../../../../../api-def/api';
import {UnitInfoDataBase} from '../../../../../utils/services/resources/types';

export type UnitInfo<T = null> = UnitInfoDataBase & {
  unitType: UnitType,
  analysisMeta: T | null
}

export const isUnitInfoHasAnalysis = (unitInfo: any): unitInfo is UnitInfo<AnalysisListEntry> => {
  return !!unitInfo.analysisMeta;
};
