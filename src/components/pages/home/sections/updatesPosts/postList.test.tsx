import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode, PostInfoEntry, PostType, SupportedLanguages} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostList} from './postList';


describe('Homepage post list', () => {
  let fnAddSubscription: jest.SpyInstance;
  let fnRemoveSubscription: jest.SpyInstance;

  const entries: PostInfoEntry[] = [
    {
      title: 'A',
      type: PostType.MISC,
      pid: 7,
      info: {
        lang: SupportedLanguages.CHT,
        viewCount: 7,
        modifiedEpoch: Date.now(),
        publishedEpoch: Date.now(),
        userSubscribed: false,
      },
    },
    {
      title: 'B',
      type: PostType.MISC,
      pid: 7,
      info: {
        lang: SupportedLanguages.CHT,
        viewCount: 7,
        modifiedEpoch: Date.now(),
        publishedEpoch: Date.now(),
        userSubscribed: false,
      },
    },
  ];

  beforeEach(() => {
    fnAddSubscription = jest.spyOn(ApiRequestSender, 'addSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
    fnRemoveSubscription = jest.spyOn(ApiRequestSender, 'removeSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
  });

  it('disables subscription button if globally subscribed', async () => {
    renderReact(() => (
      <PostList
        defaultSubscribed
        subscriptionKey={{type: 'const', name: 'ALL_QUEST'}}
        title="title"
        titlePath={GeneralPath.ABOUT}
        entries={entries}
      />
    ));

    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement);

    expect(subButtons[0]).toBeEnabled();
    subButtons.slice(1).forEach((button) => expect(button).toBeDisabled());
  });

  it('shows correct subscription status if not globally subscribed', async () => {
    renderReact(() => (
      <PostList
        defaultSubscribed={false}
        subscriptionKey={{type: 'const', name: 'ALL_QUEST'}}
        title="title"
        titlePath={GeneralPath.ABOUT}
        entries={entries}
      />
    ));

    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement);

    subButtons.forEach((button) => expect(button).toBeEnabled());
  });

  it('enables individual subscription after disabling global subscription', async () => {
    renderReact(
      () => (
        <PostList
          defaultSubscribed
          subscriptionKey={{type: 'const', name: 'ALL_QUEST'}}
          title="title"
          titlePath={GeneralPath.ABOUT}
          entries={entries}
        />
      ),
      {hasSession: true},
    );

    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement as HTMLElement);

    userEvent.click(subButtons[0]);

    await waitFor(() => expect(fnRemoveSubscription).toHaveBeenCalled());

    subButtons.slice(1).forEach((button) => expect(button).toBeEnabled());
  });

  it('disables individual subscription after enabling global subscription', async () => {
    renderReact(
      () => (
        <PostList
          defaultSubscribed={false}
          subscriptionKey={{type: 'const', name: 'ALL_QUEST'}}
          title="title"
          titlePath={GeneralPath.ABOUT}
          entries={entries}
        />
      ),
      {hasSession: true},
    );

    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement as HTMLElement);

    userEvent.click(subButtons[0]);

    await waitFor(() => expect(fnAddSubscription).toHaveBeenCalled());

    subButtons.slice(1).forEach((button) => expect(button).toBeDisabled());
  });
});
