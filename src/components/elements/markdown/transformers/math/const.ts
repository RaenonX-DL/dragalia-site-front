import {ExpressionReplacements} from './types';

export const expressionPlaceholder = '[fx]';

export const decimalRegex = /\[(\d+)f]$/;

export const charReplacements: ExpressionReplacements = [
  {
    name: 'multiplySign',
    atCalculate: '*',
    atDisplay: 'x',
    availableDirections: ['toCalculate', 'toDisplay'],
  },
  {
    name: 'percentSign',
    atCalculate: '/100',
    atDisplay: '%',
    availableDirections: ['toCalculate'],
  },
];
