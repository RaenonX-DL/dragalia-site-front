import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {EnlargedTextLevel2, EnlargedTextLevel3} from './enlarge';


describe('Enlarged text', () => {
  it('enlarges at level 2', async () => {
    const text = 'Enlarge';
    renderReact(() => <EnlargedTextLevel2>{text}</EnlargedTextLevel2>);

    expect(screen.getByText(text)).toHaveStyle({fontSize: '1.5rem'});
  });

  it('enlarges at level 3', async () => {
    const text = 'Enlarge';
    renderReact(() => <EnlargedTextLevel3>{text}</EnlargedTextLevel3>);

    expect(screen.getByText(text)).toHaveStyle({fontSize: '2rem'});
  });
});
