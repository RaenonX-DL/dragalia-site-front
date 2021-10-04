import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DataPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makeDataUrl} from '../../../../../utils/path/make';
import {transformForSearch} from '../../../../../utils/text';
import {AdsPageTop, AdsUnitKeyPointIndexEnd} from '../../../../elements/common/ads/main';
import {InternalLink} from '../../../../elements/common/link/internal';
import {Loading} from '../../../../elements/common/loading';
import {Search} from '../../../../elements/input/search/main';
import {useKeyPointData} from '../../hooks';
import {PointTypeIcon} from '../../icons';
import styles from './main.module.css';


export const KeyPointIndexPage = () => {
  const {t, lang} = useI18n();
  const {keyPointData, isFetched} = useKeyPointData();

  if (!isFetched) {
    return <Loading/>;
  }

  return (
    <>
      <AdsPageTop/>
      <Search
        options={Object.entries(keyPointData).map(([id, entry]) => ({id, ...entry}))}
        isOptionMatchSearch={(option, searchText) => (
          transformForSearch(option.description, {variantInsensitive: false}).includes(searchText)
        )}
        renderMatchedSelection={({id, type, description}) => (
          <Row noGutters key={description} className={styles.entry}>
            <Col xs="auto" className={styles.typeEntry}>
              <span className={styles.typeIcon}>{PointTypeIcon[type]}</span>&nbsp;
              <small>{t((t) => t.game.unitTier.points.type[type])}</small>
            </Col>
            <Col>
              <InternalLink
                href={makeDataUrl(DataPath.TIER_KEY_POINT, {id, lang})}
                locale={lang}
                content={description}
                newWindow
              />
            </Col>
          </Row>
        )}
        height="70vh"
      />
      <div className="mb-3"/>
      <AdsUnitKeyPointIndexEnd/>
    </>
  );
};
