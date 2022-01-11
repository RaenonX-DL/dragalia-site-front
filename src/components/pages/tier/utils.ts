import {
  DimensionKey,
  KeyPointData,
  KeyPointType,
  KeyPointTypeEnum,
  Ranking,
  RankingScore,
  UnitTierNote,
} from '../../../api-def/api';
import {generateFilterInput} from '../../elements/gameData/unit/filter/utils';
import {EntryPack, EntryPackOfRanking, InputData, KeyPointsOfType} from './types';


export const generateInputData = (): InputData => ({
  ...generateFilterInput('lastUpdated'),
  display: 'all',
});

export const getTierRanking = (tierNote: UnitTierNote, tierDimension: DimensionKey) => {
  const tierNoteDimension = tierNote.tier[tierDimension];

  if (!tierNoteDimension) {
    return 0;
  }
  return RankingScore[tierNoteDimension.ranking];
};

export const categorizeKeyPoints = (
  keyPointsData: KeyPointData, keyPointsIds?: Array<string>,
): Array<KeyPointsOfType> => {
  // Not specifying `keyPointsIds` means to categorize all data from `keyPointsData`
  const idsToInclude = keyPointsIds || Object.keys(keyPointsData);

  return Object.keys(KeyPointTypeEnum)
    .map((key) => ({
      type: key as KeyPointType,
      entries: idsToInclude
        .filter((id) => id in keyPointsData && keyPointsData[id].type === key)
        .sort()
        .map((id) => ({...keyPointsData[id], id})),
    }));
};

export const categorizeEntryPack = (
  dimension: DimensionKey, entryPacks: Array<EntryPack>,
): Array<EntryPackOfRanking> => (
  Object.keys(RankingScore)
    .map((key) => ({
      ranking: key as Ranking,
      entries: entryPacks.filter((entry) => entry.tierNote.tier[dimension]?.ranking === key),
    }))
);
