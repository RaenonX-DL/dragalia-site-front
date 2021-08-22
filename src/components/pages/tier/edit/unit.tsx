import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitInfoData} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';
import {UnitIcon} from '../../../elements/gameData/unit/icon';


type Props = {
  unitInfo: UnitInfoData
}

export const TierNoteUnitOverview = ({unitInfo}: Props) => {
  const {lang} = useI18n();

  return (
    <>
      <Row className="text-center">
        <Col>
          <UnitIcon unitInfo={unitInfo}/>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          {unitInfo.name[lang]}
        </Col>
      </Row>
    </>
  );
};
