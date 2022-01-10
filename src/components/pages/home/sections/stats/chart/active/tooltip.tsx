import React from 'react';

import {TooltipProps} from 'recharts';

import {
  GAActiveEntry,
  GAActivePeriod,
  GAActivePeriodKey,
} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import mainStyles from '../../main.module.css';
import {formatDateString} from '../../utils';
import styles from './main.module.css';


type PeriodInfo = {
  period: number,
  periodKey: string,
  dailyAvg: number,
  total: number,
  color?: string,
};

export const UserStatsPeriodicActiveTooltip = ({
  active,
  payload: payloads,
}: TooltipProps<number, string>) => {
  const {t} = useI18n();

  if (!active || !payloads || !payloads.length) {
    return <></>;
  }

  const data = payloads[0].payload as GAActiveEntry;
  const date = formatDateString(data.date);

  // `idx` is correct because the chart line is also generated using `Object.entries(GAActivePeriod)`.
  // That is, if the line generation order is no longer `Object.entries(GAActivePeriod)`,
  // check the implementation of the chart.
  const periodInfo: PeriodInfo[] = Object.entries(GAActivePeriod)
    .map(([periodKey, period], idx) => {
      const total = data[periodKey as GAActivePeriodKey];

      return {
        period,
        periodKey,
        dailyAvg: total / period,
        total,
        color: payloads[idx].color,
      };
    });

  return (
    <div className={`${styles['result-table']} ${mainStyles.tooltip}`}>
      <h5 className="text-center">{date}</h5>
      <table>
        <thead>
          <tr>
            <th>{t((t) => t.home.section.stats.ui.periodActive.period)}</th>
            <th>{t((t) => t.home.section.stats.ui.periodActive.dailyAvg)}</th>
            <th>{t((t) => t.home.section.stats.ui.periodActive.total)}</th>
            <th>{t((t) => t.home.section.stats.ui.periodActive.d28diffPct)}</th>
          </tr>
        </thead>
        <tbody>
          {periodInfo.map(({period, dailyAvg, total, color}, idx) => (
            <tr key={idx}>
              <td style={{color}}>{period}</td>
              <td style={{color}}>{dailyAvg.toFixed(2)}</td>
              <td style={{color}}>{total}</td>
              <td style={{color}}>{(dailyAvg / (data.D28 / 28) * 100 - 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
