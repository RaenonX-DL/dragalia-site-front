import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../test/render/main';
import * as alertReducers from '../../state/alert/reducer';
import {alertDuration, GlobalAlert} from './stateAlert';


describe('State alert', () => {
  let fnCloseAlert: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    fnCloseAlert = jest.spyOn(alertReducers, 'alertCloseReducer');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('disappears after timeout if show', async () => {
    renderReact(
      () => (
        <GlobalAlert/>
      ),
      {
        preloadState: {
          alert: {
            message: 'ALERT',
            variant: 'warning',
          },
        },
      },
    );

    expect(screen.getByText('ALERT')).toBeInTheDocument();

    jest.runTimersToTime(alertDuration + 100);

    expect(screen.queryByText('ALERT')).not.toBeInTheDocument();
  });

  it('does not dismiss the alert if unmount before timeout', async () => {
    const {unmount} = renderReact(
      () => (
        <GlobalAlert/>
      ),
      {
        preloadState: {
          alert: {
            message: 'ALERT',
            variant: 'warning',
          },
        },
      },
    );

    unmount();

    jest.runTimersToTime(alertDuration + 100);
    expect(fnCloseAlert).not.toHaveBeenCalled();
  });
});
