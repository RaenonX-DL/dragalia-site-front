import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {IconRadar} from '../../../../elements/common/icons';
import {InternalLink} from '../../../../elements/common/link/internal';
import {ModalFixedContent} from '../../../../elements/common/modal/fix';
import {ModalStateFix} from '../../../../elements/common/modal/types';
import styles from '../../main.module.css';
import {PropsUseKeyPointData} from '../../types';
import {TierKeyPoints} from './points';


type Props = PropsUseKeyPointData & {
  pointIds: Array<string>,
};

export const TierNotePointIcon = ({pointIds, keyPointsData}: Props) => {
  const {t} = useI18n();
  const [modalState, setModalState] = React.useState<ModalStateFix>({
    show: false,
    title: t((t) => t.game.unitTier.points.title),
  });

  return (
    <>
      <ModalFixedContent state={modalState} setState={setModalState}>
        <TierKeyPoints keyPointsIds={pointIds} keyPointsData={keyPointsData}/>
      </ModalFixedContent>
      <InternalLink
        className={styles.unitPoint}
        onClick={() => setModalState({...modalState, show: true})}
        content={<IconRadar/>}
      />
    </>
  );
};
