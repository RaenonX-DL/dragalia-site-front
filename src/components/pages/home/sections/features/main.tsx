import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {GeneralPath} from '../../../../../api-def/paths';
import {featureBtnColors} from '../../../../../const/colors';
import {useI18n} from '../../../../../i18n/hook';
import {RowRegular} from '../../../../elements/common/grid/row';
import mainStyles from '../../main.module.css';
import {FeatureButton} from './button';


export const SiteFeatures = () => {
  const {t} = useI18n();

  return (
    <>
      <h1 className={mainStyles['section-title']}>
        {t((t) => t.home.section.features)}
      </h1>
      <RowRegular className="mb-3">
        <FeatureButton
          path={GeneralPath.INFO_LOOKUP}
          title={t((t) => t.meta.inUse.gameData.info.title)}
          variant={featureBtnColors.analysis}
        />
        <FeatureButton
          path={GeneralPath.TIER_LOOKUP}
          title={t((t) => t.meta.inUse.tier.lookup.title)}
          variant={featureBtnColors.tier}
        />
      </RowRegular>
      <RowRegular className="mb-3">
        <FeatureButton
          path={GeneralPath.EX}
          title={t((t) => t.meta.inUse.gameData.ex.title)}
          variant={featureBtnColors.ex}
        />
        <FeatureButton
          path={GeneralPath.SPECIAL_THANKS}
          title={t((t) => t.meta.inUse.thanks.title)}
          variant={featureBtnColors.thanks}
        />
      </RowRegular>
      <Row className="text-center mb-3">
        <Col>
          {t((t) => t.home.message.features)}
        </Col>
      </Row>
    </>
  );
};
