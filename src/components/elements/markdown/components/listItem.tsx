import React from 'react';

import {LiComponent} from 'react-markdown/src/ast-to-react';

import {transformTextChildren} from '../transformers/text/main';


export const renderListItem: LiComponent = ({children}) => {
  return <li>{transformTextChildren(children)}</li>;
};
