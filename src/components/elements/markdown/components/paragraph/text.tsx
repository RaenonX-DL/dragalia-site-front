import React from 'react';

import {ColoredText, ColorTextMatchGroup, colorTextRegex} from '../../transformers/color';
import {transformText} from './utils';


type TextProps = {
  text: string,
}

export const Text = ({text}: TextProps) => {
  // NOTE: Implementations likely to be changed if adding an additional syntax.

  const children: Array<[number, React.ReactNode]> = [
    // Transform color text
    ...transformText<ColorTextMatchGroup>(
      text,
      colorTextRegex,
      (group) => <ColoredText regexGroup={group}/>,
    ),
  ];

  // Sort by starting index of the original text, then return ReactNode only
  return <>{children
    .sort((child) => child[0])
    .map((child) => child[1])
  }</>;
};
