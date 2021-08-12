import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import styles from '../main.module.css';
import {DimensionKey} from '../mock';
import {RankingProps, TierRanking} from './ranking';


type ItemProps = RankingProps & {
  dimension: DimensionKey,
}

export const TierNote = ({dimension, tierNote}: ItemProps) => {
  const {t} = useI18n();

  return (
    <>
      <span className={styles.title}>
        {t((t) => t.game.unitTier.dimension[dimension].name)}
      </span>
      <div>
        <TierRanking tierNote={tierNote}/>
      </div>
    </>
  );
};
