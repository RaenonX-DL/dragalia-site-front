import React from 'react';

import styles from '../main.module.css';
import {TextChildren} from '../transformers/text/main';
import {MarkdownComponentProps} from '../types';


export const renderParagraph = ({children}: MarkdownComponentProps) => (
  <div className={styles.text}>
    <TextChildren>
      {children}
    </TextChildren>
  </div>
);
