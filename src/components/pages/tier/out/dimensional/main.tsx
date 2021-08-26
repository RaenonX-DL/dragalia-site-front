import React from 'react';

import {DimensionKey, RankingScore} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {sortDescending} from '../../../../../utils/sort';
import {rankingColor} from '../../const';
import {PropsUseEntryPack, PropsUseKeyPointData} from '../../types';
import {categorizeEntryPack} from '../../utils';
import {TierListOutputRank} from './rank';


type Props = PropsUseKeyPointData & PropsUseEntryPack & {
  dimension: DimensionKey,
}

export const TierListOutputDimensional = ({
  dimension,
  entryPackHasTierNote,
  entryPackNoTierNote,
  keyPointsData,
}: Props) => {
  const {t} = useI18n();

  const categorized = categorizeEntryPack(dimension, entryPackHasTierNote)
    .sort(sortDescending({getComparer: ({ranking}) => RankingScore[ranking]}));

  return (
    <>
      {categorized.map(({ranking, entries}) => (
        <React.Fragment key={ranking}>
          <h4 style={{color: rankingColor[ranking]}}>{ranking}</h4>
          <TierListOutputRank dimension={dimension} entryPacks={entries} keyPointsData={keyPointsData}/>
        </React.Fragment>
      ))}
      {
        entryPackNoTierNote.length > 0 &&
        <>
          <h4>{t((t) => t.game.unitTier.tier.notRanked)}</h4>
          <TierListOutputRank dimension={dimension} entryPacks={entryPackNoTierNote} keyPointsData={keyPointsData}/>
        </>
      }
    </>
  );
};
