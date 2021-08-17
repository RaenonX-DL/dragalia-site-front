import {DimensionKey, Ranking, UnitTierNote} from '../../../api-def/api';
import {UnitInfoData} from '../../../api-def/resources';
import {UnitFilterInputData} from '../../elements/gameData/unit/filter/types';
import {DimensionKey, UnitTierNote} from './mock';


export type SortOrder = 'unitId' | DimensionKey | 'avgRanking';

export type InputData = UnitFilterInputData<SortOrder>;

export type EntryPack = {unitInfo: UnitInfoData, tierNote: UnitTierNote};
