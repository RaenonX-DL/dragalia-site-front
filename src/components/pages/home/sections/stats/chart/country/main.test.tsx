import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {mockData} from '../../../../../../../../test/data/mock/homepage';
import {renderReact} from '../../../../../../../../test/render/main';
import {UserStatsOfCountry} from './main';


describe('Stats of active user by country', () => {
  it('shows total', async () => {
    renderReact(() => <UserStatsOfCountry stats={mockData.stats.user.perCountry}/>);

    expect(screen.getByText(mockData.stats.user.perCountry.D30.total)).toBeInTheDocument();
  });

  it('shows total after switching period', async () => {
    renderReact(() => <UserStatsOfCountry stats={mockData.stats.user.perCountry}/>);

    const button = screen.getByText(/7/);
    userEvent.click(button);

    expect(screen.getByText(mockData.stats.user.perCountry.D7.total)).toBeInTheDocument();
  });
});
