import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../i18n/hook';
import {useAtkSkillResources} from '../../hooks/atkSkillResources';


type ConditionBadgeProps = {
  conditionCodes: Array<number>,
}

export const getConditionBadges = ({conditionCodes}: ConditionBadgeProps) => {
  const {conditionEnumMap} = useAtkSkillResources({toFetch: 'conditionEnumsOnly'});
  const {lang} = useI18n();

  return conditionCodes.map((conditionCode, idx: number) => {
    const conditionEnum = conditionEnumMap[String(conditionCode)];

    return (
      <Badge key={idx} variant={conditionEnum?.colorTheme}>{conditionEnum?.trans[lang]}</Badge>
    );
  });
};

export const ConditionBadges = ({conditionCodes}: ConditionBadgeProps) => {
  return (
    <Row>
      <Col>
        {getConditionBadges({conditionCodes}).map((badge, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && ' '}{badge}
          </React.Fragment>
        ))}
      </Col>
    </Row>
  );
};
