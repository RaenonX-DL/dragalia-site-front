import React from 'react';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import {renderers} from './renderers';

import './main.css';

type Props = {
  children: string,
}

export const Markdown = ({children}: Props) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown plugins={[gfm]} renderers={renderers}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
