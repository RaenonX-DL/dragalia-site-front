import React from 'react';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import styles from './main.module.css';
import {renderers} from './renderers';

type Props = {
  children: string,
  overrideStyle?: boolean,
}

export const Markdown = ({children, overrideStyle = true}: Props) => {
  return (
    <div className={overrideStyle ? styles.mdBody : ''}>
      <ReactMarkdown plugins={[gfm]} renderers={renderers}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
