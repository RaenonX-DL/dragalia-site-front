import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AbilityVariantEffectUnitData, ConditionEnumMap} from '../../../../../api-def/resources';
import {OverlayTooltip} from '../../../../elements/common/overlay/tooltip';
import {ExEffectUnit} from './exEffectUnit';


type ExAbilityProps = {
  effectUnits: Array<AbilityVariantEffectUnitData>,
  name: string,
  description: string,
  conditionEnums: ConditionEnumMap,
  isEx?: boolean,
}

export const ExAbility = ({effectUnits, name, description, ...props}: ExAbilityProps) => {
  return (
    <div className="text-center">
      <Row>
        <Col>
          <OverlayTooltip key={description} text={description}>
            <span>{name}</span>
          </OverlayTooltip>
        </Col>
      </Row>
      {effectUnits.map((effectUnit, index) => (
        <ExEffectUnit key={index} effectUnit={effectUnit} {...props}/>
      ))}
    </div>
  );
};
