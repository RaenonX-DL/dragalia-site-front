import {UnitInfoLookupEntry} from '../../../../../../api-def/api';
import {UnitInfoData} from '../../../../../../api-def/resources';
import {UnitFilterInputData} from '../../../../../elements/gameData/unit/filter/types';


export type SortOrder = 'unitId' | 'published' | 'lastModified' | 'viewCount';

export type InputData = UnitFilterInputData<SortOrder>;

export type UnitInfoPack = {
  lookupInfo: UnitInfoLookupEntry,
  unitInfo: UnitInfoData,
};
