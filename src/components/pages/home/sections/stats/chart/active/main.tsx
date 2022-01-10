import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../../i18n/hook';
import styles from '../../main.module.css';
import {UserStatsPeriodicActiveChart, UserStatsPeriodicActiveChartProps} from './chart';


type Props = UserStatsPeriodicActiveChartProps;

export const UserStatsPeriodicActive = ({stats}: Props) => {
  const {t} = useI18n();

  return (
    <>
      <Row className="pt-2">
        <Col xs className="d-flex justify-content-center align-items-center">
          <h5 className="mb-0">
            {t((t) => t.home.section.stats.header.active)}
          </h5>
        </Col>
      </Row>
      <Row className={styles['stats-section-filler']}>
        <Col>
          <UserStatsPeriodicActiveChart stats={stats}/>
        </Col>
      </Row>
    </>
  );
};
