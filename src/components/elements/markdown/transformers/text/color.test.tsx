import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {ColoredText} from './color';


describe('Text coloring', () => {
  it('colors text with preset color', async () => {
    renderReact(() => <ColoredText regexGroup={{color: 'red', text: 'Text'}}/>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors text with RGB', async () => {
    renderReact(() => <ColoredText regexGroup={{color: '#757577', text: 'Text'}}/>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: '#757577'});
  });
});
