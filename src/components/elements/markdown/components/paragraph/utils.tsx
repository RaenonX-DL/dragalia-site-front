import React from 'react';


export const transformText = <T extends {[key: string]: string}>(
  text: string,
  regex: RegExp,
  component: (group: T) => React.ReactNode,
) => {
  const children: Array<[number, React.ReactNode]> = [];
  let cursorIdx = 0;

  for (const match of text.matchAll(regex)) {
    const matchLocation = match.index as number;

    // Push remainder text
    children.push([cursorIdx, text.substring(cursorIdx, matchLocation)]);

    // Push converted text
    children.push([
      matchLocation,
      component(match.groups as T),
    ]);

    // Update cursor
    cursorIdx = match.index as number + match[0].length;
  }
  // Push remainder text
  children.push([cursorIdx, text.substring(cursorIdx)]);

  return children;
};
