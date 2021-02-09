import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import './main.css';

import {renderers} from './renderers';

export const Markdown: React.FunctionComponent = ({children}: any) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown plugins={[gfm]} renderers={renderers}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
