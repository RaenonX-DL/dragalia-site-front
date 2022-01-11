import React from 'react';

import Col from 'react-bootstrap/Col';

import {UnitInfoData} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../../elements/gameData/unit/link';


type Props = {
  unitInfo: UnitInfoData,
};

export const UnitEntry = ({unitInfo}: Props) => {
  const {lang} = useI18n();

  return (
    <RowNoGutter className="section">
      <Col xs="auto">
        <UnitIcon unitInfo={unitInfo} style={{height: '4rem'}}/>
      </Col>
      <Col className="align-self-center text-center">
        <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}}/>
      </Col>
    </RowNoGutter>
  );
};
