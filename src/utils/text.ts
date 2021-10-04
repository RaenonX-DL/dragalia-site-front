import {Converter} from 'opencc-js';

import {overrideObject} from './override';
import {DeepPartial} from './types';


// eslint-disable-next-line new-cap
const converter = Converter({from: 'cn', to: 't'});

type TransformOptions = {
  caseInsensitive: boolean,
  variantInsensitive: boolean,
}

export const transformForSearch =(text: string, options?: DeepPartial<TransformOptions>): string => {
  const transformOptions: TransformOptions = overrideObject(
    {
      caseInsensitive: true,
      variantInsensitive: true,
    },
    options,
    {originalOnly: true},
  );

  if (transformOptions.caseInsensitive) {
    // `toLowerCase()` is faster than `match()`
    text = text.toLowerCase();
  }

  if (transformOptions.variantInsensitive) {
    text = converter(text);
  }

  return text;
};
