import React from 'react';

import styles from '../main.module.css';
import {Text} from '../transformers/text/main';
import {MarkdownComponentProps} from '../types';


export const renderParagraph = ({children}: MarkdownComponentProps) => {
  return (
    <div className={styles.text}>
      {children.map((child, idx) => {
        if (typeof child === 'string') {
          return <Text key={idx} text={child}/>;
        }

        return <>{child}</>;
      })}
    </div>
  );
};
