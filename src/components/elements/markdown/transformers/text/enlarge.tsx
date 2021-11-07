import React from 'react';

import {Text} from './main';
import {TextComponentProps} from './types';


type EnlargedTextProps = TextComponentProps & {
  fontSize: string
};

const EnlargedText = ({children, fontSize}: EnlargedTextProps) => (
  <span style={{fontSize}}><Text>{children}</Text></span>
);

export const EnlargedTextLevel2 = ({children}: TextComponentProps) => (
  <EnlargedText fontSize={'1.5rem'}>{children}</EnlargedText>
);

export const EnlargedTextLevel3 = ({children}: TextComponentProps) => (
  <EnlargedText fontSize={'2rem'}>{children}</EnlargedText>
);
