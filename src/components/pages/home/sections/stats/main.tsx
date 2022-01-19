import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {HomepageLandingResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';
import mainStyles from '../../main.module.css';
import {UserStatsPeriodicActive} from './chart/active/main';
import {UserStatsOfCountry} from './chart/country/main';
import {UserStatsOfLang} from './chart/lang/main';
import styles from './main.module.css';


type Props = {
  response: HomepageLandingResponse,
};

export const SiteStats = ({response}: Props) => {
  const {t} = useI18n();

  const {stats} = response.data;

  return (
    <>
      <h1 className={mainStyles['section-title']}>
        {t((t) => t.home.section.stats.title)}
      </h1>
      <Row className={styles['stats-section']}>
        <Col className={styles['stats-section-outer']}>
          <UserStatsOfCountry stats={stats.user.perCountry}/>
        </Col>
      </Row>
      <Row className={styles['stats-section']}>
        <Col className={styles['stats-section-outer']}>
          <UserStatsOfLang stats={stats.user.perLang}/>
        </Col>
      </Row>
      <Row className={styles['stats-section']}>
        <Col className={styles['stats-section-outer']}>
          <UserStatsPeriodicActive stats={stats.user.active}/>
        </Col>
      </Row>
      <Row className="text-end mb-2">
        <Col>
          {t((t) => t.misc.timestamp.lastUpdated)}:&nbsp;
          <TimeAgo epoch={stats.lastFetchedEpoch * 1000}/>
        </Col>
      </Row>
    </>
  );
};
