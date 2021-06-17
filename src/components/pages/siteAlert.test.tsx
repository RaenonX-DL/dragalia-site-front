import React from 'react';

import {fireEvent, screen} from '@testing-library/react';

import {renderReact} from '../../../test/render/main';
import {SiteAlert} from './siteAlert';


describe('Global site alert', () => {
  it('shows alerts', async () => {
    renderReact(
      () => <SiteAlert/>,
      {
        alerts: [
          {
            message: 'Alert 1',
            variant: 'info',
          },
          {
            message: 'Alert 2',
            variant: 'warning',
          },
        ],
      },
    );

    const alertElement = screen.getByText('Alert 1');

    expect(screen.getByText('Alert 1')).toBeInTheDocument();
    fireEvent.animationIteration(alertElement);
    expect(screen.getByText('Alert 2')).toBeInTheDocument();
  });

  it('does not show anything if no alert', async () => {
    renderReact(() => <SiteAlert/>);

    expect(screen.queryByText('Alert 1')).not.toBeInTheDocument();
  });
});
