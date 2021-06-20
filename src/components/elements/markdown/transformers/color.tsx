import React from 'react';


/**
 * Regex for finding the text coloring syntax.
 *
 * Syntax: `[<color>]<text>[/]`.
 *
 * `color` can be either a RGB color prefixed with `#` (`#757575`) or a preset color (`red`).
 *
 * Match result of this regex is expect to have group `color` and `text`.
 */
export const colorTextRegex = /\[(?<color>#[A-Fa-f0-9]{6}|[a-z]+)](?<text>[^\[\/\]]*)\[\/]/g;

export type ColorTextMatchGroup = {
  color: string,
  text: string,
}

type ColorTextProps = {
  regexGroup: ColorTextMatchGroup,
}

export const ColoredText = ({regexGroup}: ColorTextProps) => {
  const {color, text} = regexGroup;

  return <span style={{color}}>{text}</span>;
};
