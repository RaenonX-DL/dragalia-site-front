import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitInfoLookupEntry} from '../../../../../../api-def/api';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo/hooks';
import {UnitInfoEntry} from '../out/entry/main';


type Props = {
  analyses: Array<UnitInfoLookupEntry>,
};

export const UnitInfoLookupLanding = ({analyses}: Props) => {
  const {unitInfoMap} = useUnitInfo();

  return (
    <Row className="mb-2">
      {analyses
        .flatMap((entry) => {
          const unitInfo = unitInfoMap.get(entry.unitId);
          return unitInfo ? [{entry, unitInfo}] : [];
        })
        .map(({entry, unitInfo}) => (
          <Col lg={6} xl={4} className="mt-2 mt-lg-0 mb-0 mb-lg-2" key={unitInfo.id}>
            <UnitInfoEntry unitInfo={unitInfo} analysisMeta={entry} simplified/>
          </Col>
        ))}
    </Row>
  );
};
