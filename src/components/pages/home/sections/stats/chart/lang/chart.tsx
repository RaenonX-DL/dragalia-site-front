import React from 'react';

import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {GALangUserOfDate} from '../../../../../../../api-def/api';
import {formatDateString} from '../../utils';
import {colors, stroke} from '../const';
import {UserStatsOfLangProps} from './main';
import {UserStatsOfLangTooltip} from './tooltip';


type Props = UserStatsOfLangProps & {
  stacked: boolean,
};

export const UserStatsOfLangChart = ({stats, stacked}: Props) => {
  return (
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
  );
};
