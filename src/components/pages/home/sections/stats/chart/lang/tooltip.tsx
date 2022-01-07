import React from 'react';

import {TooltipProps} from 'recharts';
import {ValueType, NameType} from 'recharts/src/component/DefaultTooltipContent';

import {GALangUserOfDate} from '../../../../../../../api-def/api';
import {useI18n} from '../../../../../../../i18n/hook';
import {sum} from '../../../../../../../utils/calc';
import styles from './main.module.css';


type LegendInfo = {
  lang: string,
  user: number,
  color?: string,
};

export const UserStatsOfLangTooltip = ({
  active,
  payload: payloads,
  label: date,
}: TooltipProps<ValueType, NameType>) => {
  const {t} = useI18n();

  if (!active || !payloads || !payloads.length) {
    return <></>;
  }

  const langCountInfo: LegendInfo[] = [];

  // `.slice().reverse()` to correct the order of the displayed items
  payloads.slice().reverse().forEach((payload) => {
    const {payload: data, value, color} = payload;

    const dataEntry = Object
      .entries((data as GALangUserOfDate).user)
      .find(([_, count]) => count === value);

    if (!dataEntry) {
      return;
    }

    langCountInfo.push({lang: dataEntry[0], user: dataEntry[1], color});
  });

  const total = sum(Object.values((payloads[0].payload as GALangUserOfDate).user));

  return (
    <div className={styles.tooltip}>
      <h5 className="text-center">{date}</h5>
      <p className="mb-0">
        {t((t) => t.home.section.stats.content.totalLangUser, {total})}
      </p>
      <hr className="my-2"/>
      {langCountInfo.map(({lang, user, color}, idx) => (
        <p className="mb-0" key={idx} style={{color}}>{lang}: {user}</p>
      ))}
    </div>
  );
};
