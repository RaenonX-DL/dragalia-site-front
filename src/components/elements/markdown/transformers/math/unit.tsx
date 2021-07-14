import React from 'react';

import {OverlayTooltip} from '../../../common/overlay/tooltip';
import styles from '../../main.module.css';
import {ExpressionOutputProps} from './types';


export const ExpressionOutput = ({exprExtractResult, evalResult, expression}: ExpressionOutputProps) => {
  if (exprExtractResult.location === 'none') {
    return (
      <OverlayTooltip key={expression} text={expression} placement="top">
        <span className={styles.calc}>
          <i className="bi bi-calculator"/>&nbsp;
          {evalResult}
        </span>
      </OverlayTooltip>
    );
  }

  return (
    <span className={styles.calc}>
      <i className="bi bi-calculator"/>&nbsp;
      {exprExtractResult.location === 'start' && `(${expression}) `}
      {evalResult}
      {exprExtractResult.location === 'end' && ` (${expression})`}
    </span>
  );
};
