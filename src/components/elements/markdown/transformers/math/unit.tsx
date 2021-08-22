import React from 'react';

import {OverlayTooltip} from '../../../common/overlay/tooltip';
import styles from '../../main.module.css';
import {IconMath} from './icons';
import {ExpressionOutputProps} from './types';


export const ExpressionOutput = ({exprExtractResult, evalResult, expression}: ExpressionOutputProps) => {
  if (exprExtractResult.location === 'none') {
    return (
      <OverlayTooltip key={expression} text={expression} placement="top">
        <span className={styles.calc}>
          <IconMath/>&nbsp;
          {evalResult}
        </span>
      </OverlayTooltip>
    );
  }

  return (
    <span className={styles.calc}>
      <IconMath/>&nbsp;
      {exprExtractResult.location === 'start' && `(${expression}) `}
      {evalResult}
      {exprExtractResult.location === 'end' && ` (${expression})`}
    </span>
  );
};
