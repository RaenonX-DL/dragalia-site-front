import React from 'react';

// import {ColorizedText, isStringTransformable} from '../transformers/colorize';
import styles from '../main.module.css';
import {MarkdownComponentProps} from '../types';


export const renderText = ({children}: MarkdownComponentProps) => {
  // if (isStringTransformable(o.value)) {
  //   return <ColorizedText text={o.value}/>;
  // }

  return <div className={styles.text}>{children}</div>;
};
