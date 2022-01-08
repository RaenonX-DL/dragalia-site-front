import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {GAPeriodicLangUserData} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import styles from '../../main.module.css';
import {buttonStyle} from '../const';
import {UserStatsOfLangChart} from './chart';


export type UserStatsOfLangProps = {
  stats: GAPeriodicLangUserData
};

export const UserStatsOfLang = ({stats}: UserStatsOfLangProps) => {
  const {t} = useI18n();

  const [stacked, setStacked] = React.useState(false);

  return (
    <>
      <Row className="p-2">
        <Col className="d-flex justify-content-center align-items-center mb-3 mb-lg-0">
          <h5 className="mb-0">
            {t((t) => t.home.section.stats.header.perLang)}
          </h5>
        </Col>
        <Col lg="auto" className="text-right text-lg-center">
          <Button variant={buttonStyle} onClick={() => setStacked(!stacked)}>
            {t((t) => (
              stacked ? t.home.section.stats.ui.separated : t.home.section.stats.ui.stacked
            ))}
          </Button>
        </Col>
      </Row>
      <Row className={styles['stats-section-filler']}>
        <Col>
          <UserStatsOfLangChart stats={stats} stacked={stacked}/>
        </Col>
      </Row>
    </>
  );
};
