import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {DepotPaths} from '../../../../../utils/services/resources/paths';
import {AbilityVariantEffectUnitData} from '../../../../../utils/services/resources/types';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

type ExEffectUnitProps = {
  effectUnit: AbilityVariantEffectUnitData,
  rate: number,
  badges: Array<React.ReactElement>,
}

export const ExEffectUnit = ({
  effectUnit, rate, badges,
}: ExEffectUnitProps) => {
  const {lang} = useI18n();

  return (
    <>
      <Row>
        <Col style={{fontSize: '1.1rem'}}>
          <OverlayTooltip text={effectUnit.parameter.name[lang]}>
            <img
              src={DepotPaths.getImageURL(effectUnit.parameter.imagePath)}
              alt={effectUnit.parameter.name[lang]}
              style={{height: '2rem'}}
            />
          </OverlayTooltip>
          <OverlayTooltip text={rate.toString()}>
            <span className="align-middle">
              &nbsp;{rate.toFixed(0)}&nbsp;{effectUnit.paramUnit.name[lang]}
            </span>
          </OverlayTooltip>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            badges.map((badge, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && ' '}{badge}
                </React.Fragment>
              );
            })
          }
        </Col>
      </Row>
    </>
  );
};
