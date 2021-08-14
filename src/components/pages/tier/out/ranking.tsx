import React from 'react';

import {IconNotes} from '../../../elements/common/icons';
import {CommonModal, ModalState} from '../../../elements/common/modal';
import {rankingColor} from '../const';
import {IconCompDependent} from '../icons';
import styles from '../main.module.css';
import {TierNote} from '../mock';


export type RankingProps = {
  tierNote?: TierNote,
}

export const TierRanking = ({tierNote}: RankingProps) => {
  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: tierNote?.note,
  });

  if (!tierNote) {
    return <span className={styles.ranking}>-</span>;
  }

  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState} clearContentOnClose={false}/>
      <div className="d-inline">
        <span className={styles.ranking} style={{color: rankingColor[tierNote.ranking]}}>{tierNote.ranking}</span>
        {tierNote && tierNote.isCompDependent && <>&nbsp;<IconCompDependent/></>}
      </div>
      <a className={styles.tierNote} onClick={() => setModalState({...modalState, show: true})}>
        <IconNotes/>
      </a>
    </>
  );
};
