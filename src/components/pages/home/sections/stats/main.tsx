import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {HomepageData} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';
import mainStyles from '../../main.module.css';
import {UserStatsOfCountry} from './chart/country/main';
import {UserStatsOfLang} from './chart/lang/main';
import styles from './main.module.css';


type Props = {
  data: HomepageData,
};

export const SiteStats = ({data}: Props) => {
  const {t} = useI18n();

  return (
    <>
      <h1 className={mainStyles.sectionTitle}>
        {t((t) => t.home.section.stats.title)}
      </h1>
      <Row noGutters className={styles.statsSection}>
        <Col className={styles.statsSectionOuter}>
          <UserStatsOfCountry stats={data.stats.user.perCountry}/>
        </Col>
      </Row>
      <Row noGutters className={styles.statsSection}>
        <Col className={styles.statsSectionOuter}>
          <UserStatsOfLang stats={data.stats.user.perLang}/>
        </Col>
      </Row>
      <Row className="text-right mb-2">
        <Col>
          {t((t) => t.misc.timestamp.lastUpdated)}:&nbsp;
          <TimeAgo epoch={data.stats.lastFetchedEpoch}/>
        </Col>
      </Row>
    </>
  );
};
