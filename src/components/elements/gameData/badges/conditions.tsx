import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useConditionBadges} from './hooks';
import {BsBadge} from './main';
import {ConditionBadgeOptions} from './types';


export const ConditionBadges = ({conditionCodes}: ConditionBadgeOptions) => {
  const conditionBadges = useConditionBadges({conditionCodes});

  return (
    <Row>
      <Col>
        {conditionBadges.map((badge, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && ' '}<BsBadge entry={badge}/>
          </React.Fragment>
        ))}
      </Col>
    </Row>
  );
};
