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
  try {
    evalResult = evaluate(replaceExpression(children, 'toCalculate'));
  } catch (e) {
    return <>{children}</>;
  }

  if (decimalInfo.decimalCount) {
    evalResult = evalResult.toFixed(decimalInfo.decimalCount);
  }

  return (
    <ExpressionOutput
      exprExtractResult={expressionInfo}
      expression={replaceExpression(children, 'toDisplay')}
      evalResult={evalResult}
    />
  );
};
