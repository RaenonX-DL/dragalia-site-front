import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {UserSettingsGeneral} from './general';


describe('User config - General', () => {
  it('shows that the user is ads-free', async () => {
    renderReact(
      () => <UserSettingsGeneral/>,
      {hasSession: true, user: {adsFreeExpiry: new Date()}},
    );

    expect(screen.getByText(translationEN.userControl.general.adsFreeInEffect)).toBeInTheDocument();
  });

  it('shows that the user is not ads-free', async () => {
    renderReact(
      () => <UserSettingsGeneral/>,
      {hasSession: true},
    );

    expect(screen.getByText(translationEN.userControl.general.adsFreeNotEffective)).toBeInTheDocument();
  });

  it('shows that the user is an admin', async () => {
    renderReact(
      () => <UserSettingsGeneral/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    expect(screen.getByText(translationEN.userControl.general.isAdmin)).toBeInTheDocument();
  });

  it('shows the email of the user', async () => {
    const email = 'user@email.com';

    renderReact(
      () => <UserSettingsGeneral/>,
      {user: {email}},
    );

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
  });
});
