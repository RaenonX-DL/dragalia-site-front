import React from 'react';

import {LiComponent} from 'react-markdown/src/ast-to-react';

import {TextChildren} from '../transformers/text/main';


export const renderListItem: LiComponent = ({children}) => {
  return (
    <li>
      <TextChildren>
        {children}
      </TextChildren>
    </li>
  );
};
