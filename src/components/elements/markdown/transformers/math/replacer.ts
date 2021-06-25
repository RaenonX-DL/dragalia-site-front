import {charReplacements} from './const';
import {ExpressionReplaceDirection} from './types';


export const replaceExpression = (expression: string, direction: ExpressionReplaceDirection): string => {
  charReplacements.forEach(([display, evaluate]) => {
    if (direction === 'toCalculate') {
      expression = expression.replace(display, evaluate);
    }
    if (direction === 'toDisplay') {
      expression = expression.replace(evaluate, display);
    }
  });

  return expression;
};
