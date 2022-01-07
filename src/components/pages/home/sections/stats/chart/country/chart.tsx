import React from 'react';

import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {
  GACountryUserEntry,
  GAPeriodicCountryUserData,
  GAPeriodKey,
} from '../../../../../../../api-def/api/info/stats/elements';
import {colors, stroke} from '../const';
import {UserStatsOfCountryLabel} from './label';
import {UserStatsOfCountryProps} from './main';
import {UserStatsOfCountryTooltip} from './tooltip';


type Props = UserStatsOfCountryProps & {
  stats: GAPeriodicCountryUserData,
  dataKey: GAPeriodKey,
};

export const UserStatsOfCountryChart = ({stats, dataKey}: Props) => {
  const data = stats[dataKey];

  const countries = Object.fromEntries(Object.values(stats)
    .flatMap((entries) => (
      entries.countries.map((entry) => entry.country)
    ))
    .map((country, idx) => [country, colors[idx % colors.length]]));

  return (
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
        <Tooltip
          content={<UserStatsOfCountryTooltip totalCount={data.total}/>}
          cursor={{fill: 'rgba(120, 120, 120, 0.5)'}}
        />
        <Bar
          dataKey={(data: GACountryUserEntry) => data.user}
          label={<UserStatsOfCountryLabel/>}
        >
          {data.countries.map((entry, idx) => (
            <Cell key={idx} fill={countries[entry.country]}/>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
