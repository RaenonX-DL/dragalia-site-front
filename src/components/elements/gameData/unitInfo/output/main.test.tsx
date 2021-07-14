import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {UnitInfo} from './main';


describe('Advanced unit info page', () => {
  it('renders character info', async () => {
    renderReact(
      () => <UnitInfo/>,
      {contextParams: {unitId: 10950101}},
    );

    expect(await screen.findByText('Gala Leonidas')).toBeInTheDocument();
  });

  it('renders dragon info', async () => {
    renderReact(
      () => <UnitInfo/>,
      {contextParams: {unitId: 20050524}},
    );

    expect(await screen.findByText('Gala Reborn Nidhogg')).toBeInTheDocument();
  });

  it('renders page not found for non-existing units', async () => {
    renderReact(
      () => <UnitInfo/>,
      {contextParams: {unitId: 87}},
    );

    expect(await screen.findByText('The page does not exist.')).toBeInTheDocument();
  });
});
