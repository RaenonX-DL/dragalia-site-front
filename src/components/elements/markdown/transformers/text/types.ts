import React from 'react';

export type TextComponentProps = {
  children: string,
}

export type Syntax = {
  start: string,
  end: string,
  Component: React.FunctionComponent<TextComponentProps>,
}
