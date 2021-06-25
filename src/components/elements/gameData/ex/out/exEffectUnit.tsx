import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DepotPaths, AbilityVariantEffectUnitData} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../common/image';
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
          <ImageWithOverlay
            src={DepotPaths.getImageURL(effectUnit.parameter.imagePath)}
            text={effectUnit.parameter.name[lang]}
            style={{height: '2rem'}}
          />
          <OverlayTooltip text={rate.toString()} key={rate}>
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
