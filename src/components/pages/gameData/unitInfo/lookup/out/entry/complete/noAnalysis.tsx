import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../../../../../i18n/hook';
import {RowNoGutter} from '../../../../../../../elements/common/grid/row';
import {UnitLink} from '../../../../../../../elements/gameData/unit/link';
import styles from '../../../main.module.css';
import {EntryCommonProps} from '../types';


type Props = EntryCommonProps;

export const CompleteEntryNoAnalysis = ({unitInfo}: Props) => {
  const {t} = useI18n();

  return (
    <>
      <RowNoGutter className={styles['info-top']}>
        <Col>
          <UnitLink unit={{...unitInfo, icon: undefined}} hasAnalysis={false}/>
        </Col>
      </RowNoGutter>
      <RowNoGutter className={styles['info-bottom']}>
        <Col className="text-danger text-center">
          {t((t) => t.posts.analysis.error.unavailable)}
        </Col>
      </RowNoGutter>
    </>
  );
};
