import React from 'react';

import styles from '../../main.module.css';
import {MarkdownComponentProps} from '../../types';
import {Text} from './text';


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
