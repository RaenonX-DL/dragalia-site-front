import React from 'react';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  GAActiveEntry,
  GAActivePeriod,
  GAActivePeriodKey,
  GAPeriodicActiveUserData,
} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import {formatDateString} from '../../utils';
import {colors, stroke} from '../const';
import {UserStatsPeriodicActiveTooltip} from './tooltip';


export type UserStatsPeriodicActiveChartProps = {
  stats: GAPeriodicActiveUserData,
};

export const UserStatsPeriodicActiveChart = ({stats}: UserStatsPeriodicActiveChartProps) => {
  const {t} = useI18n();
  const {data} = stats;

  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 4" stroke={stroke}/>
        <XAxis
          dataKey={(data: GAActiveEntry) => formatDateString(data.date)}
          stroke={stroke}
          tickLine={false}
          fontSize="0.8rem"
        />
        <YAxis
          stroke={stroke}
          tickLine={false}
          fontSize="0.8rem"
        />
        <Legend verticalAlign="top" height={28}/>
        <Tooltip content={<UserStatsPeriodicActiveTooltip/>}/>
        {/* Tooltip data depends on the order of the `<Line>` */}
        {Object.keys(GAActivePeriod).map((period, idx) => {
          const periodKey = period as GAActivePeriodKey;
          const periodDays = GAActivePeriod[periodKey];

          return (
            <Line
              key={idx}
              dataKey={(data: GAActiveEntry) => (data[periodKey] || 0) / periodDays}
              dot={false}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              name={t((t) => t.home.section.stats.ui.periodActive.legend, {periodDays})}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
