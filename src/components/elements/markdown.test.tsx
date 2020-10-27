// eslint-disable-next-line no-unused-vars
import React from 'react';
import {render} from '@testing-library/react';

import {Markdown} from './markdown';

test('Check main page', () => {
  const {getByText} = render(<Markdown>Paragraph</Markdown>);
  const linkElement = getByText(/Paragraph/i);
  expect(linkElement).toBeInTheDocument();
});

// TEST: More markdown render test
