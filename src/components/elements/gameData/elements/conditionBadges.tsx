import React from 'react';

import {Badge, Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../i18n/utils';
import {ConditionEnumMap} from '../../../../utils/services/resources/types';


export type ConditionBadgeProps = {
  conditionCodes: Array<number>,
  conditionEnums: ConditionEnumMap,
}


export const getConditionBadges = ({conditionCodes, conditionEnums}: ConditionBadgeProps) => {
  const {lang} = useTranslation();

  return conditionCodes.map((conditionCode, idx: number) => {
    const conditionEnum = conditionEnums[String(conditionCode)];

    return (
      <Badge key={idx} variant={conditionEnum?.colorTheme}>{conditionEnum?.trans[lang]}</Badge>
    );
  });
};


export const ConditionBadges = ({conditionCodes, conditionEnums}: ConditionBadgeProps) => {
  return (
    <Row>
      <Col>
        {
          getConditionBadges({conditionCodes, conditionEnums}).map((badge, idx: number) => {
            return (
              <React.Fragment key={idx}>
                {idx > 0 && ' '}{badge}
              </React.Fragment>
            );
          })
        }
      </Col>
    </Row>
  );
};