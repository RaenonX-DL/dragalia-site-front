import React from 'react';

import {DimensionKey} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import styles from '../main.module.css';
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
