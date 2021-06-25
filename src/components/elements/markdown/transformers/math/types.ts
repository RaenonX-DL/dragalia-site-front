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

export type CalcExpressionProps = {
  children: string,
}

export type ExpressionOutputProps = {
  exprExtractResult: ExtractExpressionReturn,
  expression: string,
  evalResult: string,
}
