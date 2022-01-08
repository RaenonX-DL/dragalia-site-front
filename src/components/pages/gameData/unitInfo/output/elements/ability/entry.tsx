import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DepotPaths, OfficialAbilityInfo} from '../../../../../../../api-def/resources';
import {useI18n} from '../../../../../../../i18n/hook';
import {Image} from '../../../../../../elements/common/image';
import {InfoBlock} from '../info';


type EntryProps = {
  info: OfficialAbilityInfo,
};

export const OfficialAbilityEntry = ({info}: EntryProps) => {
  const {lang} = useI18n();

  return (
    <Row className="mx-1">
      <Col xs="auto">
        <Image
          src={DepotPaths.getAbilityIconURL(info.iconPath)}
          text={info.iconPath}
          style={{height: '3rem'}}
        />
      </Col>
      <Col>
        <InfoBlock>{info.description[lang]}</InfoBlock>
      </Col>
    </Row>
  );
};
