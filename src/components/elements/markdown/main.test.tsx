// eslint-disable-next-line no-unused-vars
import {render} from '@testing-library/react';
import React from 'react';

import {Markdown} from './main';

test('Check main page', () => {
  const {getByText} = render(<Markdown>Paragraph</Markdown>);
  const linkElement = getByText(/Paragraph/i);
  expect(linkElement).toBeInTheDocument();
});
