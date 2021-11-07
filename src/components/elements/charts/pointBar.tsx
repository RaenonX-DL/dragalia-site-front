import React from 'react';

import * as CSS from 'csstype';

import {normalize, varTally} from '../../../utils/calc';


type PointBarProps = {
  dataPoints: Array<number>,
  height?: number,
  radius?: number,
  color?: CSS.Property.Stroke,
  padding?: number,
  displayText?: boolean,
  fixPoints?: number,
};

export const PointBar = ({
  dataPoints,
  height = 40,
  radius = 5,
  color = 'white',
  padding = 0.03,
  displayText = true,
  fixPoints,
}: PointBarProps) => {
  const dataPointsTally = varTally(dataPoints);
  const dataPointsUnique = dataPoints.filter((item, idx, arr) => arr.indexOf(item) === idx);

  const normalizedPoints = normalize(dataPointsUnique, padding);

  const lineY = height * (displayText ? (1 / 4) : (1 / 2));

  return (
    <svg height={height} width="100%">
      <line
        x1={`${padding * 100}%`} y1={lineY} x2={`${(1 - padding) * 100}%`} y2={lineY}
        style={{stroke: color, strokeWidth: 2}}/>
      {
        normalizedPoints.map((normalized: number, index: number) => {
          const normalizedPct = `${normalized * 100}%`;

          const dataPoint = dataPointsUnique[index];

          const pointCount = dataPointsTally.get(dataPoint);

          return (
            <>
              <circle cx={normalizedPct} cy={lineY} r={radius} fill={color}/>
              {
                displayText &&
                <text x={normalizedPct} y={height * (3 / 4)} textAnchor="middle" fill={color}>
                  {fixPoints ? dataPoint.toFixed(fixPoints) : dataPoint}
                  {pointCount && `x ${pointCount}`}
                </text>
              }
            </>
          );
        })
      }
    </svg>
  );
};
