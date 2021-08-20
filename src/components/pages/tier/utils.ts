import {
  DimensionKey,
  KeyPointData,
  KeyPointType,
  KeyPointTypeEnum,
  RankingScore,
  UnitTierNote,
} from '../../../api-def/api';
import {generateFilterInput} from '../../elements/gameData/unit/filter/utils';
import {CategorizedKeyPoints, InputData} from './types';


export const generateInputData = (): InputData => generateFilterInput('avgRanking');

export const getTierRanking = (tierNote: UnitTierNote, tierDimension: DimensionKey) => {
  const tierNoteDimension = tierNote.tier[tierDimension];

  if (!tierNoteDimension) {
    return 0;
  }
  return RankingScore[tierNoteDimension.ranking];
};

export const categorizeKeyPoints = (
  keyPointsData: KeyPointData, keyPointsIds?: Array<string>,
): CategorizedKeyPoints => {
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
