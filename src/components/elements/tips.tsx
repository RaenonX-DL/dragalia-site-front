import React from 'react';

import {Markdown} from './markdown';

export const Tips = () => {
  const test = `
  # Hello

  -------

  A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

  * Lists
  * [ ] todo
  * [x] done

  A table:

  | a | b |
  | :---: | :---: |
  | c | d |
  `;

  return (
    <Markdown>{test}</Markdown>
  );
};
