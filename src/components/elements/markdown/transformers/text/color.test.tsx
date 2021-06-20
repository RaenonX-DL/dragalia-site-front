import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {ColoredText} from './color';


describe('Text coloring', () => {
  it('colors text with preset color', async () => {
    const textContent = '[red]Text';
    renderReact(() => <ColoredText>{textContent}</ColoredText>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors text with RGB', async () => {
    const textContent = '[#757577]Text';
    renderReact(() => <ColoredText>{textContent}</ColoredText>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: '#757577'});
  });
});
