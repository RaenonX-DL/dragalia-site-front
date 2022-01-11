import {DimensionKey, KeyPointData, KeyPointEntry, KeyPointType, Ranking, UnitTierNote} from '../../../api-def/api';
import {UnitInfoData} from '../../../api-def/resources';
import {UnitFilterInputData} from '../../elements/gameData/unit/filter/types';


export type SortOrder = DimensionKey | 'unitId' | 'avgRanking' | 'lastUpdated';

export type Display = DimensionKey | 'all';

export type DisplayOption = {
  key: Display,
  text: string,
};

export type InputData = UnitFilterInputData<SortOrder> & {
  display: Display,
};

export type EntryPack = {
  unitInfo: UnitInfoData,
  tierNote: UnitTierNote
};

export type EntryPackNoTierNote = Omit<EntryPack, 'tierNote'> & {
  tierNote: undefined,
};

export type EntryPackOutput = Omit<EntryPack, 'tierNote'> & {
  tierNote?: UnitTierNote,
};

export type TierNoteEdit = {
  isCompDependent: boolean,
  ranking: Ranking,
  note: string,
  toDelete?: boolean,
};

export type UnitTierNoteEdit = Omit<UnitTierNote, 'lastUpdateEpoch' | 'tier'> & {
  tier: {[dim in DimensionKey]?: TierNoteEdit},
};

export type KeyPointsOfType = {
  type: KeyPointType,
  entries: Array<KeyPointEntry & {id: string}>
};

export type EntryPackOfRanking = {
  ranking: Ranking,
  entries: Array<EntryPack>,
};

export type PropsUseKeyPointData = {
  keyPointsData: KeyPointData,
};

export type PropsUseEntryPack = {
  entryPackHasTierNote: Array<EntryPack>,
  entryPackNoTierNote: Array<EntryPackNoTierNote>,
};

export type PropsDimensionalCommon = {
  dimension: DimensionKey,
  iconOnly: boolean,
};
