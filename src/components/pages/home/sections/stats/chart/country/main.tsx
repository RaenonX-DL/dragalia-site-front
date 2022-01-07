import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {GAPeriodicCountryUserData} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import styles from '../../main.module.css';
import {buttonStyle} from '../const';
import {UserStatsOfCountryChart} from './chart';
import {periodOptions} from './const';
import {PeriodOption} from './type';


export type UserStatsOfCountryProps = {
  stats: GAPeriodicCountryUserData
};

export const UserStatsOfCountry = ({stats}: UserStatsOfCountryProps) => {
  const {t} = useI18n();

  const [currentOption, setCurrentOption] = React.useState<PeriodOption>({
    dataKey: 'D30',
    periodDays: 30,
  });

  const data = stats[currentOption.dataKey];

  return (
    <>
      <Row className="p-2">
        <Col xs className="d-flex justify-content-center align-items-center mb-3 mb-lg-0">
          <h5 className="mb-0">
            {t((t) => t.home.section.stats.header.perCountry)}
          </h5>
        </Col>
        <Col xs="auto" lg={1} className="d-flex justify-content-center align-items-center mb-3 mb-lg-0">
          <span className="h5 mb-0" style={{fontFamily: 'monospace', color: 'yellow'}}>
            {data.total}
          </span>
        </Col>
        <Col lg="auto" className="text-right text-lg-center">
          <ButtonGroup size="sm">
            {periodOptions.map((option) => (
              <Button
                key={option.periodDays}
                variant={buttonStyle}
                onClick={() => setCurrentOption(option)}
                active={option.periodDays === currentOption.periodDays}
              >
                {option.periodDays}&nbsp;
                {t((t) => t.home.section.stats.ui.periodUnitDay)}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      <Row className={styles.statsSectionFiller}>
        <Col>
          <UserStatsOfCountryChart stats={stats} dataKey={currentOption.dataKey}/>
        </Col>
      </Row>
    </>
  );
};
