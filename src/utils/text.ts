import {OpenCC} from 'opencc';

import {overrideObject} from './override';
import {DeepPartial} from './types';


// Config name doc: https://github.com/BYVoid/OpenCC#configurations-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
const openCC: OpenCC = new OpenCC('s2t.json');

type TransformOptions = {
  caseInsensitive: boolean,
  variantInsensitive: boolean,
}

export const transformForSearch = (text: string, options?: DeepPartial<TransformOptions>): string => {
  const transformOptions: TransformOptions = overrideObject(
    {
      caseInsensitive: true,
      variantInsensitive: true,
    },
    options,
    {originalOnly: true},
  );

  if (transformOptions.caseInsensitive) {
    text = text.toLowerCase();
  }

  if (transformOptions.variantInsensitive) {
    text = openCC.convertSync(text);
  }

  return text;
};
