import {CalcExpression} from '../math/main';
import {ColoredText} from './color';
import {EnlargedTextLevel2, EnlargedTextLevel3} from './enlarge';
import {Syntax} from './types';
import {MarkdownUnitName} from './unit';


const colorSyntax: Syntax = {
  start: '::',
  end: '::',
  Component: ColoredText,
};

const calcSyntax: Syntax = {
  start: '==',
  end: '==',
  Component: CalcExpression,
};

const unitSyntax: Syntax = {
  start: '--',
  end: '--',
  Component: MarkdownUnitName,
};

const enlargeLv3Syntax: Syntax = {
  start: '!!!',
  end: '!!!',
  Component: EnlargedTextLevel3,
};

const enlargeLv2Syntax: Syntax = {
  start: '!!',
  end: '!!',
  Component: EnlargedTextLevel2,
};

// NOTE: Order matters!
export const syntaxCollection = [
  colorSyntax,
  calcSyntax,
  unitSyntax,
  enlargeLv3Syntax,
  enlargeLv2Syntax,
];
