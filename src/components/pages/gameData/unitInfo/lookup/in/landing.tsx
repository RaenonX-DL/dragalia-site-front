import React from 'react';

import Col from 'react-bootstrap/Col';

import {UnitInfoLookupEntry} from '../../../../../../api-def/api';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo/hooks';
import {RowTight} from '../../../../../elements/common/grid/row';
import styles from '../main.module.css';
import {UnitInfoEntry} from '../out/entry/main';


type Props = {
  analyses: Array<UnitInfoLookupEntry>,
};

export const UnitInfoLookupLanding = ({analyses}: Props) => {
  const {unitInfoMap} = useUnitInfo();

  return (
    <RowTight className={styles['landing-entry']}>
      {analyses
        .flatMap((entry) => {
          const unitInfo = unitInfoMap.get(entry.unitId);
          return unitInfo ? [{entry, unitInfo}] : [];
        })
        .map(({entry, unitInfo}) => (
          <Col lg={6} xl={4} key={unitInfo.id}>
            <UnitInfoEntry unitInfo={unitInfo} analysisMeta={entry} simplified/>
          </Col>
        ))}
    </RowTight>
  );
};
