import React from 'react';

import {Text} from './main';
import {TextComponentProps} from './types';


/**
 * Regex for finding the text coloring syntax.
 *
 * Syntax: `[<color>]<text>`.
 *
 * `color` can be either a RGB color prefixed with `#` (`#757575`) or a preset color (`red`).
 *
 * Match result of this regex is expect to have group `color` and `text`.
 */
const colorTextRegex = /\[(?<color>#[A-Fa-f0-9]{6}|[a-z]+)](?<text>[^\[\/\]]*)/;

export const ColoredText = ({children}: TextComponentProps) => {
  const match = colorTextRegex.exec(children);

  if (!match?.groups) {
    // No match or groups exist, keep the original text
    return <Text>{children}</Text>;
  }

  const {color, text} = match.groups;

  return (
    <span style={{color}}>
      <Text>{text}</Text>
    </span>
  );
};
