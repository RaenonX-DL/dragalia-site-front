import React from 'react';

import {TierNote} from '../../../../../api-def/api';
import {rankingColor} from '../../const';
import {IconCompDependent} from '../../icons';
import styles from '../../main.module.css';
import {TierNoteIcon} from './noteIcon';


export type RankingProps = {
  tierNote?: TierNote,
};

export const TierRanking = ({tierNote}: RankingProps) => {
  if (!tierNote) {
    return <span className={styles.ranking}>-</span>;
  }

  return (
    <>
      <div className="d-inline">
        <span className={styles.ranking} style={{color: rankingColor[tierNote.ranking]}}>{tierNote.ranking}</span>
        {tierNote.isCompDependent && <>&nbsp;<IconCompDependent/></>}
      </div>
      <TierNoteIcon tierNote={tierNote} iconClassName={styles.tierNote}/>
    </>
  );
};
