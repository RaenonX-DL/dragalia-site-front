import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {UnitInfoLookupEntry} from '../../../../../../api-def/api';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo/hooks';
import {UnitInfoEntry} from '../out/entry';


type Props = {
  analyses: Array<UnitInfoLookupEntry>,
}

export const UnitInfoLookupLanding = ({analyses}: Props) => {
  const {unitInfoMap} = useUnitInfo();

  return (
    <Form.Row className="mb-2">
      {
        analyses
          .flatMap((entry) => {
            const unitInfo = unitInfoMap.get(entry.unitId);
            return unitInfo ? [{entry, unitInfo}] : [];
          })
          .map(({entry, unitInfo}) => (
            <Col lg className="mt-2 mt-lg-0" key={unitInfo.id}>
              <UnitInfoEntry
                unitInfo={unitInfo}
                analysisMeta={entry}
                isFetchingMeta={false}
                simplified
              />
            </Col>
          ))
      }
    </Form.Row>
  );
};
