import React from 'react';

import {evaluate} from 'mathjs';

import {replaceExpression} from './replacer';
import {CalcExpressionProps} from './types';
import {ExpressionOutput} from './unit';
import {extractDecimal, extractExpressionLocation} from './utils';


export const CalcExpression = ({children}: CalcExpressionProps) => {
  const decimalInfo = extractDecimal(children);
  children = decimalInfo.newExpression;
  const expressionInfo = extractExpressionLocation(children);
  children = expressionInfo.newExpression;

  children = children.trim(); // Trim whitespaces there's any

  let evalResult;
  const replaceResult = replaceExpression(children, 'toCalculate');
  try {
    evalResult = evaluate(replaceResult.expression, {pct: 0.01});
  } catch (e) {
    return <>{children}</>;
  }

  // Cannot merge this because:
  // - *100 and postfix `%` at first: `toFixed()` cannot execute
  // - *100 and postfix `%` at last:  if `decimalCount` not provided, 510% (5.1) will be 500% (5.0)
  if (replaceResult.replacementUsed.percentSign) {
    evalResult *= 100;
  }
  evalResult = evalResult.toFixed(decimalInfo.decimalCount || 0);
  if (replaceResult.replacementUsed.percentSign) {
    evalResult = `${evalResult}%`;
  }

  return (
    <ExpressionOutput
      exprExtractResult={expressionInfo}
      expression={replaceExpression(children, 'toDisplay').expression}
      evalResult={evalResult}
    />
  );
};
