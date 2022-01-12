import React from 'react';

import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from 'recharts';

import {useI18n} from '../../../../i18n/hook';
import {calcEnmityMod} from '../../../../utils/game/enmity';
import {useLayout} from '../../../hooks/layout/main';
import {stroke} from './const';
import {EnmityData} from './types';


type Props = {
  inputData: EnmityData,
};

export const EnmityCharts = ({inputData}: Props) => {
  const {t} = useI18n();
  const {isLandscape} = useLayout();

  const data = [...Array(101).keys()].map((hpPercent) => ({
    hpPercent,
    enmityMod: calcEnmityMod(hpPercent, inputData.mod.enmity.original),
  }));

  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 4" stroke={stroke.grid}/>
        <XAxis
          dataKey="hpPercent"
          stroke={stroke.grid}
          tickLine={false}
          fontSize="0.8rem"
          label={{
            value: t((t) => t.game.calc.enmity.title.hp),
            position: 'insideBottom',
            offset: -5,
            stroke: stroke.grid,
          }}
          type="number"
          ticks={
            isLandscape ?
              [...Array(21).keys()].map((num) => num * 5) :
              [...Array(11).keys()].map((num) => num * 10)
          }
        />
        <YAxis
          stroke={stroke.grid}
          tickLine={false}
          fontSize="0.8rem"
          domain={[1, 'dataMax']}
          tickCount={11}
          label={{
            value: t((t) => t.game.calc.enmity.title.mod),
            position: 'insideLeft',
            angle: -90,
            offset: 15,
            stroke: stroke.grid,
          }}
        />
        <ReferenceLine x={inputData.hp.currentPct} stroke={stroke.refLine}/>
        <ReferenceLine y={inputData.mod.enmity.effective} stroke={stroke.refLine}/>
        <Line
          dataKey="enmityMod"
          dot={false}
          stroke={stroke.line}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
