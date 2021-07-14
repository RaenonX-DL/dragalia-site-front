type ExtractReturn = {
  newExpression: string,
}

export type ExtractDecimalReturn = ExtractReturn & {
  decimalCount: number | null,
}

export type ExpressionLocation = 'start' | 'end' | 'none'

export type ExtractExpressionReturn = ExtractReturn & {
  location: ExpressionLocation
}

export type ExpressionReplaceDirection = 'toCalculate' | 'toDisplay';

export type ExpressionReplacementName = 'multiplySign' | 'percentSign';

export type ExpressionReplacement = {
  name: ExpressionReplacementName,
  atCalculate: string,
  atDisplay: string,
  availableDirections: Array<ExpressionReplaceDirection>,
}

export type ExpressionReplacements = Array<ExpressionReplacement>

export type ExpressionReplaceReturn = {
  expression: string,
  replacementUsed: { [name in ExpressionReplacementName]: boolean },
}

export type ExpressionOutputProps = {
  exprExtractResult: ExtractExpressionReturn,
  expression: string,
  evalResult: string,
}
