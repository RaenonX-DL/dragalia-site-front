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
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={overrideStyle ? styles.mdBody : ''}>
      <ReactMarkdown plugins={[gfm]} components={renderers}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
