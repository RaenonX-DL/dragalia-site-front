import React from 'react';

import {TextChildren} from '../transformers/text/main';
import {MarkdownComponentProps} from '../types';


export const renderStrong = ({children}: MarkdownComponentProps) => (
  <strong>
    <TextChildren>
      {children}
    </TextChildren>
  </strong>
);
