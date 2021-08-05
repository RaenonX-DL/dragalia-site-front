import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CalculatedSkillEntry} from '../types';


type SectionSkillDamageProps = {
  calculatedData: CalculatedSkillEntry,
}

export const SectionSkillDamage = ({calculatedData}: SectionSkillDamageProps) => {
  const removeDigit = (num: number) => num.toLocaleString(undefined, {maximumFractionDigits: 0});

  return (
    <Row noGutters className="text-center">
      <Col className="my-auto">
        <small>{removeDigit(calculatedData.skillDamage.lowest)}</small>
      </Col>
      <Col className="my-auto">
        <span className="h4">{removeDigit(calculatedData.skillDamage.expected)}</span>
      </Col>
      <Col className="my-auto">
        <small>{removeDigit(calculatedData.skillDamage.highest)}</small>
      </Col>
    </Row>
  );
};
