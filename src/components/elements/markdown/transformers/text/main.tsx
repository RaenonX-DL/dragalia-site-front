import React from 'react';

import {syntaxCollection} from './syntax';
import {TextComponentProps} from './types';


export const Text = ({children}: TextComponentProps) => {
  // Text start test benchmark: https://jsbench.me/bnkq5gug02
  // Text end test benchmark: https://jsbench.me/nfkq5gy0od

  for (let idxStart = 0; idxStart < children.length; idxStart++) {
    const text = children.substring(idxStart);

    for (const Syntax of syntaxCollection) {
      if (!text.startsWith(Syntax.start)) {
        continue; // Text not started with the command
      }

      let idxEnd = text.indexOf(Syntax.end, Syntax.start.length);
      if (idxEnd === -1) {
        continue; // Closing command not found, continue the search
      }
      idxEnd += idxStart; // return of `indexOf` is offset instead (text is substring)

      const leftRemainder = children.substring(0, idxStart);
      const extracted = children.substring(idxStart + Syntax.start.length, idxEnd);
      const rightRemainder = children.substring(idxEnd + Syntax.end.length);

      return (
        <>
          <Text>{leftRemainder}</Text>
          <Syntax.Component>{extracted}</Syntax.Component>
          <Text>{rightRemainder}</Text>
        </>
      );
    }
  }

  return <>{children}</>;
};

type TextChildrenProps = {
  children: Array<React.ReactNode>,
}

export const TextChildren = ({children}: TextChildrenProps) => {
  if (!children) {
    return <></>;
  }

  return (
    <>
      {
        children.map((child, idx) => {
          if (typeof child === 'string') {
            return <Text key={idx}>{child}</Text>;
          }

          return <React.Fragment key={idx}>{child}</React.Fragment>;
        })
      }
    </>
  );
};
