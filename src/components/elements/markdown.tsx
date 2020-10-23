import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const Markdown: React.FunctionComponent = ({children}: any) => {
  return (
    <ReactMarkdown plugins={[gfm]}>{children}</ReactMarkdown>
  );
};
