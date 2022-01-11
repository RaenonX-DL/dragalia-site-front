import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DepotPaths, AbilityVariantEffectUnitData, ConditionEnumMap} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../../elements/common/image';
import {OverlayTooltip} from '../../../../elements/common/overlay/tooltip';
import {BsBadge} from '../../../../elements/gameData/badges/main';
import {useAbilityVariantEffectBadges} from './hooks';


type ExEffectUnitProps = {
  effectUnit: AbilityVariantEffectUnitData,
  conditionEnums: ConditionEnumMap,
  isEx?: boolean,
};

export const ExEffectUnit = ({effectUnit, conditionEnums, isEx}: ExEffectUnitProps) => {
  const {lang} = useI18n();
  const badges = useAbilityVariantEffectBadges(effectUnit, conditionEnums, isEx);

  let rate = effectUnit.rate;
  if (effectUnit.paramUnit.isPercentage) {
    rate *= 100;
  }

  return (
    <Row className="align-items-center">
      <Col xs="auto" className="text-info">
        <ImageWithOverlay
          src={DepotPaths.getImageURL(effectUnit.parameter.imagePath)}
          text={effectUnit.parameter.name[lang]}
          style={{height: '1.5rem'}}
        />
        <OverlayTooltip text={rate.toString()} key={rate}>
          <span className="align-middle">
            &nbsp;{rate.toFixed(0)}&nbsp;{effectUnit.paramUnit.name[lang]}
          </span>
        </OverlayTooltip>
      </Col>
      <Col>
        {badges.map((badge, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && ' '}<BsBadge entry={badge}/>
          </React.Fragment>
        ))}
      </Col>
    </Row>
  );
};
