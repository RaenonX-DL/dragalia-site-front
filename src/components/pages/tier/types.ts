import {DimensionKey, KeyPointEntry, KeyPointType, Ranking, UnitTierNote} from '../../../api-def/api';
import {UnitInfoData} from '../../../api-def/resources';
import {UnitFilterInputData} from '../../elements/gameData/unit/filter/types';


export type SortOrder = 'unitId' | DimensionKey | 'avgRanking';

export type InputData = UnitFilterInputData<SortOrder>;

export type EntryPack = {unitInfo: UnitInfoData, tierNote: UnitTierNote};

export type TierNoteEdit = {
  isCompDependent: boolean,
  ranking: Ranking,
  note: string,
  toDelete?: boolean,
}

export type UnitTierNoteEdit = Omit<UnitTierNote, 'lastUpdateEpoch' | 'tier'> & {
  tier: { [dim in DimensionKey]?: TierNoteEdit },
}

export type KeyPointsOfType = {
  type: KeyPointType,
  entries: Array<KeyPointEntry & {id: string}>
};

export type CategorizedKeyPoints = Array<KeyPointsOfType>;
