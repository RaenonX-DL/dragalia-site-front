import React from 'react';

import {ColoredText, ColorTextMatchGroup, colorTextRegex} from './color';
import {transformText} from './utils';


type TextProps = {
  text: string,
}

const Text = ({text}: TextProps) => {
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

export const transformTextChildren = (children: Array<React.ReactNode>) => {
  return children.map((child, idx) => {
    if (typeof child === 'string') {
      return <Text key={idx} text={child}/>;
    }

    return <>{child}</>;
  });
};
