import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode, SubscriptionKey} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {SubscribeButton} from './main';


describe('Subscribe button', () => {
  it('shows login required on click if un-authed', async () => {
    renderReact(() => (
      <SubscribeButton defaultSubscribed={false} subscriptionKey={{type: 'const', name: 'ALL_MISC'}}/>
    ));

    const subButton = screen.getByText('', {selector: 'i.bi-bell-slash'});

    userEvent.click(subButton);

    expect(await screen.findByText(translationEN.message.error.auth.loginRequired)).toBeInTheDocument();
    expect(screen.queryByText('', {selector: 'div.spinner-border'})).not.toBeInTheDocument();
  });

  it('sends subscription update request', async () => {
    const id = new ObjectId().toHexString();
    const subKey: SubscriptionKey = {type: 'const', name: 'ALL_MISC'};
    const fnUpdateSubscription = jest.spyOn(ApiRequestSender, 'addSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(
      () => <SubscribeButton defaultSubscribed={false} subscriptionKey={subKey}/>,
      {user: {id}},
    );

    const subButton = screen.getByText('', {selector: 'i.bi-bell-slash'});

    userEvent.click(subButton);

    expect(screen.getByText('', {selector: 'div.spinner-border'})).toBeInTheDocument();
    expect(fnUpdateSubscription).toHaveBeenCalledWith(id, subKey);

    expect(await screen.findByText('', {selector: 'i.bi-bell'})).toBeInTheDocument();
  });

  it('shows as text', async () => {
    renderReact(() => (
      <SubscribeButton defaultSubscribed={false} subscriptionKey={{type: 'const', name: 'ALL_MISC'}} asIcon={false}/>
    ));

    expect(screen.getByText(translationEN.misc.subscription.add)).toBeInTheDocument();
  });
});
