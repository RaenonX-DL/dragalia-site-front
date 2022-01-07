import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis} from 'recharts';

import {GACountryUserEntry, GAPeriodicCountryUserData} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import styles from '../../main.module.css';
import {buttonStyle, colors, stroke} from '../const';
import {periodOptions} from './const';
import {PeriodOption} from './type';


type Props = {
  stats: GAPeriodicCountryUserData
};

export const UserStatsOfCountry = ({stats}: Props) => {
  const {t} = useI18n();

  const [currentOption, setCurrentOption] = React.useState<PeriodOption>({
    dataKey: 'D30',
    periodDays: 30,
  });

  const data = stats[currentOption.dataKey];

  const countries = Object.fromEntries(Object.values(stats)
    .flatMap((entries) => (
      entries.countries.map((entry) => entry.country)
    ))
    .map((country, idx) => [country, colors[idx % colors.length]]));

  return (
    <>
      <Row className="p-2">
        <Col className="d-flex justify-content-center align-items-center">
          <h5 className="mb-0">
            {t((t) => t.home.section.stats.header.perCountry)}
          </h5>
        </Col>
        <Col lg={1} className="d-flex justify-content-center align-items-center">
          <span className="h5 mb-0" style={{fontFamily: 'monospace', color: 'yellow'}}>
            {data.total}
          </span>
        </Col>
        <Col lg="auto">
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
          <ResponsiveContainer>
            <BarChart data={data.countries} layout="vertical">
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis
                stroke={stroke}
                tickLine={false}
                fontSize="0.8rem"
                type="number"
              />
              <YAxis
                stroke={stroke}
                tickLine={false}
                fontSize="0.8rem"
                type="category"
                dataKey={(data: GACountryUserEntry) => data.country}
              />
              <Bar dataKey={(data: GACountryUserEntry) => data.user}>
                {data.countries.map((entry, idx) => (
                  <Cell key={idx} fill={countries[entry.country]}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
};
