import {decimalRegex, expressionPlaceholder} from './const';
import {ExtractDecimalReturn, ExtractExpressionReturn} from './types';


export const extractDecimal = (expression: string): ExtractDecimalReturn => {
  const decimalSearchResult = decimalRegex.exec(expression);
  if (!decimalSearchResult) {
    return {
      decimalCount: null,
      newExpression: expression,
    };
  }

  return {
    decimalCount: +decimalSearchResult[1],
    newExpression: expression.substring(0, decimalSearchResult.index),
  };
};

export const extractExpressionLocation = (expression: string): ExtractExpressionReturn => {
  if (expression.startsWith(expressionPlaceholder)) {
    return {
      location: 'start',
      newExpression: expression.substring(expressionPlaceholder.length),
    };
  }

  if (expression.endsWith(expressionPlaceholder)) {
    return {
      location: 'end',
      newExpression: expression.substring(0, expression.length - expressionPlaceholder.length),
    };
  }

  return {
    location: 'none',
    newExpression: expression,
  };
};
