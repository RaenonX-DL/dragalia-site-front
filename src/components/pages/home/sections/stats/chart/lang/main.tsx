import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {GALangUserOfDate, GAPeriodicLangUserData} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import styles from '../../main.module.css';
import {formatDateString} from '../../utils';
import {buttonStyle, colors, stroke} from '../const';
import {UserStatsOfLangTooltip} from './tooltip';


type Props = {
  stats: GAPeriodicLangUserData
};

export const UserStatsOfLang = ({stats}: Props) => {
  const {t} = useI18n();

  const [stacked, setStacked] = React.useState(false);

  return (
    <>
      <Row className="p-2">
        <Col className="d-flex justify-content-center align-items-center">
          <h5 className="mb-0">
            {t((t) => t.home.section.stats.header.perLang)}
          </h5>
        </Col>
        <Col lg="auto">
          <Button variant={buttonStyle} onClick={() => setStacked(!stacked)}>
            {t((t) => (
              stacked ? t.home.section.stats.ui.separated : t.home.section.stats.ui.stacked
            ))}
          </Button>
        </Col>
      </Row>
      <Row className={styles.statsSectionFiller}>
        <Col>
          <ResponsiveContainer>
            {/* Array re-assignment for triggering the re-render on stack/separate change */}
            <AreaChart data={[...stats.data]}>
              <CartesianGrid strokeDasharray="1 4" stroke={stroke}/>
              <XAxis
                dataKey={(data: GALangUserOfDate) => formatDateString(data.date)}
                stroke={stroke}
                tickLine={false}
                fontSize="0.8rem"
              />
              <YAxis
                stroke={stroke}
                tickLine={false}
                tickCount={6}
                fontSize="0.8rem"
              />
              <Tooltip content={<UserStatsOfLangTooltip/>}/>
              {/* `.slice().reverse()` to put the data with less count at the bottom of the chart */}
              {stats.toppedLang.slice().reverse().map((lang, idx) => (
                <Area
                  key={idx}
                  dataKey={(data: GALangUserOfDate) => data.user[lang] || 0}
                  stackId={stacked ? 1 : idx}
                  stroke={colors[idx % colors.length]}
                  strokeWidth={2}
                  fill="rgba(0, 0, 0, 0)"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
};
