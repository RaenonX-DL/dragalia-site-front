import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {AuthPath} from '../../../../const/path/definitions';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {UserControlButton} from './main';


describe('Sign-in button', () => {
  it('shows logout when the user is logged in', async () => {
    renderReact(
      () => <UserControlButton/>,
      {
        hasSession: true,
      },
    );

    expect(screen.getByText(translationEN.userControl.logout)).toBeInTheDocument();
  });

  it('shows login if the user has not logged in', async () => {
    renderReact(
      () => <UserControlButton/>,
      {
        hasSession: false,
      },
    );

    expect(screen.getByText(translationEN.userControl.login)).toBeInTheDocument();
  });

  it('does not show anything if the current page is login page', async () => {
    renderReact(
      () => <UserControlButton/>,
      {
        hasSession: false,
        routerOptions: {
          pathname: AuthPath.SIGN_IN,
        },
      },
    );

    expect(screen.queryByText(translationEN.userControl.login)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.userControl.logout)).not.toBeInTheDocument();
  });
});
