import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AbilityVariantEffectUnitData, ConditionEnumMap} from '../../../../../api-def/resources';
import {OverlayTooltip} from '../../../../elements/common/overlay/tooltip';
import {ExEffectUnit} from './exEffectUnit';
import {getAbilityVariantEffectBadges} from './utils';


type ExAbilityProps = {
  effectUnits: Array<AbilityVariantEffectUnitData>,
  name: string,
  description: string,
  conditionEnums: ConditionEnumMap,
  isEx?: boolean,
}

export const ExAbility = ({effectUnits, name, description, conditionEnums, isEx = false}: ExAbilityProps) => (
  <div className="text-center">
    <Row>
      <Col>
        <OverlayTooltip key={description} text={description}>
          <span>{name}</span>
        </OverlayTooltip>
      </Col>
    </Row>
    {
      effectUnits.map((effectUnit, index) => {
        const badges = getAbilityVariantEffectBadges(effectUnit, conditionEnums, isEx);

        let rate = effectUnit.rate;
        if (effectUnit.paramUnit.isPercentage) {
          rate *= 100;
        }

        return <ExEffectUnit key={index} effectUnit={effectUnit} rate={rate} badges={badges}/>;
      })
    }
  </div>
);
