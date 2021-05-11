import React from 'react';

import Color from 'color';

import {accumulate, normalize} from '../../../utils/calc';
import {OverlayTooltip} from '../common/overlay/tooltip';

type DistributionProps = {
  data: Array<number>,
  bgColors?: Array<string>,
  height?: number | string,
  padding?: number,
  displayText?: boolean,
  displayAsPct?: boolean,
}

export const DistributionBar = ({
  data,
  bgColors = ['#707070', '#505050'],
  height = '1.5rem',
  padding = 0.03,
  displayText = true,
  displayAsPct = true,
}: DistributionProps) => {
  const accumulatedData = accumulate([0].concat(data));

  const normalizedAccumulated = normalize(accumulatedData, padding);
  const normalizedPoints = normalize(data.concat(Math.max(...accumulatedData)));
  const normalizedPadded = normalizedPoints.map((num) => num * (1 - (2 * padding)));

  return (
    <svg height={height} width="100%">
      {
        normalizedAccumulated
          .slice(0, normalizedAccumulated.length - 1)
          .map((left: number, index: number) => {
            const leftPct = `${left * 100}%`;
            const widthPct = `${normalizedPadded[index] * 100}%`;

            const textPct = `${(left + normalizedPadded[index] / 2) * 100}%`;

            const bgColor = bgColors[index % bgColors.length];
            const textColor = new Color(bgColor).isLight() ? 'black' : 'white';

            const value = data[index];
            const percent = normalizedPoints[index];

            const text = `${displayAsPct ? `${(value * 100).toFixed(0)}%` : value} (${(percent * 100).toFixed(2)}%)`;

            if (percent < 0.1 || !displayText) {
              return (
                <OverlayTooltip text={text} key={index}>
                  <rect x={leftPct} width={widthPct} height={height} style={{fill: bgColor}}/>
                </OverlayTooltip>
              );
            }

            return (
              <React.Fragment key={index}>
                <rect x={leftPct} width={widthPct} height={height} style={{fill: bgColor}}/>
                <text
                  x={textPct} y="50%" alignmentBaseline="middle" textAnchor="middle"
                  fill={textColor} fontSize="smaller">
                  {text}
                </text>
              </React.Fragment>
            );
          })
      }
    </svg>
  );
};
