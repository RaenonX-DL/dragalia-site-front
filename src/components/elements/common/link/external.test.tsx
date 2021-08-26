import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {ExternalLink} from './external';


describe('External link', () => {
  it('attaches props for opening a new window', async () => {
    renderReact(() => <ExternalLink href="https://google.com" newWindow>A</ExternalLink>);

    const linkElement = screen.getByText('A');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noreferrer');
  });
});
