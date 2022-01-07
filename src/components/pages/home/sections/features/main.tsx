import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {GeneralPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import mainStyles from '../../main.module.css';
import {FeatureButton} from './button';


export const SiteFeatures = () => {
  const {t} = useI18n();

  return (
    <>
      <h1 className={mainStyles.sectionTitle}>
        {t((t) => t.home.section.features)}
      </h1>
      <Row className="mb-0 mb-lg-3">
        <FeatureButton
          path={GeneralPath.INFO_LOOKUP}
          title={t((t) => t.meta.inUse.gameData.info.title)}
          variant="outline-light"
        />
        <FeatureButton
          path={GeneralPath.TIER_LOOKUP}
          title={t((t) => t.meta.inUse.tier.lookup.title)}
          variant="outline-primary"
        />
      </Row>
      <Row className="mb-0 mb-lg-3">
        <FeatureButton
          path={GeneralPath.EX}
          title={t((t) => t.meta.inUse.gameData.ex.title)}
          variant="outline-success"
        />
        <FeatureButton
          path={GeneralPath.SPECIAL_THANKS}
          title={t((t) => t.meta.inUse.thanks.title)}
          variant="outline-orange"
        />
      </Row>
      <Row className="text-center mb-3">
        <Col>
          {t((t) => t.home.message.features)}
        </Col>
      </Row>
    </>
  );
};
