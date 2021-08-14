import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {TierList} from './main';


describe('Tier list page', () => {
  it('renders without error', async () => {
    renderReact(() => <TierList/>);
  });

  it('performs search and return results without error', async () => {
    renderReact(() => <TierList/>);

    const searchButton = screen.getByText('Search');
    userEvent.click(searchButton);

    expect(await screen.findByText(/tier/)).toBeInTheDocument();
  });
});
