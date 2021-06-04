import React from 'react';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import {renderers} from './renderers';
import './main.module.css';

type Props = {
  children: string,
  overrideStyle?: boolean,
}

export const Markdown = ({children, overrideStyle = true}: Props) => {
  return (
    <div className={overrideStyle ? 'markdown-body' : ''}>
      <ReactMarkdown plugins={[gfm]} renderers={renderers}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
