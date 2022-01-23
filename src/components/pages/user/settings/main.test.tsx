import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import base64url from 'base64url';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../test/render/main';
import {ApiResponseCode, PostType, SubscriptionKey, UserConfigApi} from '../../../../api-def/api';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {UserSettings} from './main';


describe('User config', () => {
  let fnSetConfig: jest.SpyInstance;

  const subscriptionKeys: SubscriptionKey[] = [
    {type: 'const', name: 'ALL_QUEST'},
    {type: 'post', postType: PostType.QUEST, id: 7},
  ];

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'getUserConfig').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      subscriptionKeysBase64: base64url.encode(JSON.stringify(subscriptionKeys)),
    });

    fnSetConfig = jest.spyOn(ApiRequestSender, 'updateUserConfig').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
  });

  it('requires login', async () => {
    renderReact(() => <UserSettings/>);

    expect(await screen.findByText(translationEN.message.error.auth.loginRequired)).toBeInTheDocument();
  });

  it('renders if logged in', async () => {
    renderReact(() => <UserSettings/>, {hasSession: true});

    expect(await screen.findByText(translationEN.userControl.layout.config)).toBeInTheDocument();
  });

  it('sends correct payload for update', async () => {
    const id = new ObjectId().toHexString();
    renderReact(() => <UserSettings/>, {hasSession: true, user: {id}});

    const subscriptionTab = await screen.findByText(translationEN.userControl.settings.subscriptions);
    userEvent.click(subscriptionTab);

    const removeAllButton = screen.getByText(translationEN.userControl.subscriptions.removeAll);
    userEvent.click(removeAllButton);

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    const expected: UserConfigApi = {
      subscriptionKeysBase64: base64url(JSON.stringify([])),
    };
    expect(fnSetConfig).toHaveBeenCalledWith(id, expected);
  });
});
