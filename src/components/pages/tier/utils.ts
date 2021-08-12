import {generateFilterInput} from '../../elements/gameData/unit/filter/utils';
import {DimensionKey, RankingScore, UnitTierNote} from './mock';
import {InputData} from './types';


export const generateInputData = (): InputData => generateFilterInput('unitId');

export const getTierRanking = (tierNote: UnitTierNote, tierDimension: DimensionKey) => {
  const tierNoteDimension = tierNote.tier[tierDimension];

  if (!tierNoteDimension) {
    return 0;
  }
  return RankingScore[tierNoteDimension.ranking];
};
