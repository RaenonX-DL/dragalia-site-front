import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {ImageInHTML} from './main';


describe('Image in HTML', () => {
  it('renders image with specified class names', async () => {
    renderReact(() => <ImageInHTML src="https://i.imgur.com/mtxtE5j.jpeg%5BclassName%5D" alt="alt"/>);

    expect(screen.getByAltText('alt')).toHaveClass('className');
  });

  it('renders image if no class name', async () => {
    renderReact(() => <ImageInHTML src="https://i.imgur.com/mtxtE5j.jpeg" alt="alt"/>);

    expect(screen.getByAltText('alt')).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
  });
});
