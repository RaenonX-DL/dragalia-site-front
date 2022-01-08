import React from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {components} from './components';
import styles from './main.module.css';


type Props = {
  children: string,
  overrideStyle?: boolean,
};

export const Markdown = ({children, overrideStyle = true}: Props) => {
  return (
    <div className={overrideStyle ? styles['md-body'] : ''}>
      <ReactMarkdown plugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
