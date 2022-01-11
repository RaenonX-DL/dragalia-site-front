import React from 'react';

import {LabelProps} from 'recharts';


export const UserStatsOfCountryLabel = ({x, y, width, height, value}: LabelProps) => {
  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) + Number(height) / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fontWeight={500}
    >
      {value}
    </text>
  );
};
