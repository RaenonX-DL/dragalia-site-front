import React from 'react';

import {Col, Form} from 'react-bootstrap';

import {AnalysisLookupEntry} from '../../../../../../api-def/api';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo';
import {AnalysisEntry} from '../out/entry';


type AnalysisLookupLandingProps = {
  analyses: Array<AnalysisLookupEntry>,
}

export const AnalysisLookupLanding = ({analyses}: AnalysisLookupLandingProps) => {
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
              <AnalysisEntry
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
