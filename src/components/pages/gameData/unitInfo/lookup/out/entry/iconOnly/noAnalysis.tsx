import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../../../../../i18n/hook';
import {unitInfoToClickableProps} from '../../../../../../../../utils/services/resources/unitInfo/utils';
import {RowNoGutter} from '../../../../../../../elements/common/grid/row';
import {UnitIconClickable} from '../../../../../../../elements/gameData/unit/iconClickable';
import styles from '../../../main.module.css';
import {EntryCommonProps} from '../types';


type Props = EntryCommonProps;

export const IconOnlyEntryNoAnalysis = ({unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <>
      <RowNoGutter className="pt-1 text-center">
        <Col>
          <UnitIconClickable
            unit={unitInfoToClickableProps(unitInfo, lang)}
            hasAnalysis={false}
            className={styles['unit-icon']}
          />
        </Col>
      </RowNoGutter>
      <RowNoGutter className="align-items-center">
        <Col className="text-danger text-center">
          {t((t) => t.posts.analysis.error.unavailable)}
        </Col>
      </RowNoGutter>
    </>
  );
};
