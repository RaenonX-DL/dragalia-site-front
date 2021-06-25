import {escapeRegexChars} from '../../../../../utils/regex';
import {charReplacements} from './const';
import {ExpressionReplaceDirection, ExpressionReplaceReturn} from './types';


type ReplaceResult = {
  isChanged: boolean,
  replacedExpression: string,
}

const replace = (expression: string, src: RegExp, dst: string): ReplaceResult => {
  const replacedExpression = expression.replace(src, dst);

  return {
    isChanged: replacedExpression !== expression,
    replacedExpression,
  };
};

export const replaceExpression = (
  expression: string,
  direction: ExpressionReplaceDirection,
): ExpressionReplaceReturn => {
  const replacementUsed: ExpressionReplaceReturn['replacementUsed'] = {
    multiplySign: false,
    percentSign: false,
  };

  charReplacements.forEach((replacement) => {
    if (!replacement.availableDirections.includes(direction)) {
      return;
    }

    if (direction === 'toCalculate') {
      const {replacedExpression, isChanged} = replace(
        expression,
        new RegExp(escapeRegexChars(replacement.atDisplay), 'g'),
        replacement.atCalculate,
      );
      expression = replacedExpression;
      replacementUsed[replacement.name] ||= isChanged;
    }
    if (direction === 'toDisplay') {
      const {replacedExpression, isChanged} = replace(
        expression,
        new RegExp(escapeRegexChars(replacement.atCalculate), 'g'),
        replacement.atDisplay,
      );
      expression = replacedExpression;
      replacementUsed[replacement.name] ||= isChanged;
    }
  });

  return {replacementUsed, expression};
};
