import React from 'react';

import {TooltipProps} from 'recharts';

import {GACountryUserEntry} from '../../../../../../../api-def/api';
import styles from '../../main.module.css';


type Props = TooltipProps<number, string> & {
  totalCount: number,
};

export const UserStatsOfCountryTooltip = ({payload, totalCount}: Props) => {
  if (!payload || !payload.length || !payload[0].payload) {
    return <></>;
  }

  const data = (payload[0].payload as GACountryUserEntry);

  return (
    <div className={styles.tooltip}>
      {data.user}&nbsp;({(data.user / totalCount * 100).toFixed(2)}%)
    </div>
  );
};
