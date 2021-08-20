import {DimensionKey, RankingScore, UnitTierNote} from '../../../api-def/api';
import {generateFilterInput} from '../../elements/gameData/unit/filter/utils';
import {InputData} from './types';


export const generateInputData = (): InputData => generateFilterInput('avgRanking');

export const getTierRanking = (tierNote: UnitTierNote, tierDimension: DimensionKey) => {
  const tierNoteDimension = tierNote.tier[tierDimension];

  if (!tierNoteDimension) {
    return 0;
  }
  return RankingScore[tierNoteDimension.ranking];
};
