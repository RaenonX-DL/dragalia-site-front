import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {UserSettings} from './main';


describe('User config', () => {
  it('requires login', async () => {
    renderReact(() => <UserSettings/>);

    expect(screen.getByText(translationEN.message.error.auth.loginRequired)).toBeInTheDocument();
  });

  it('renders if logged in', async () => {
    renderReact(() => <UserSettings/>, {hasSession: true});

    expect(screen.getByText(translationEN.userControl.layout.config)).toBeInTheDocument();
  });
});
