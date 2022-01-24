import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ApiResponseCode, MiscPostListResponse, SupportedLanguages} from '../../../../src/api-def/api';
import {MiscPostList} from '../../../../src/components/pages/posts/misc/list/list';
import {translation as translationEN} from '../../../../src/i18n/translations/en/translation';
import {translations} from '../../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../../test/render/main';


describe('Misc listing page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetchList: jest.SpyInstance;

  const postListResponse: MiscPostListResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    posts: [{
      lang: SupportedLanguages.EN,
      seqId: 1,
      title: 'title',
      viewCount: 7,
      modifiedEpoch: 0,
      publishedEpoch: 0,
      userSubscribed: false,
    }],
    userSubscribed: true,
  };

  beforeEach(() => {
    fnFetchList = jest.spyOn(ApiRequestSender, 'miscList') .mockResolvedValue(postListResponse);
  });

  it('allows access for anonymous users', async () => {
    renderReact(() => <MiscPostList/>, {hasSession: false});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('allows access for non-admin users', async () => {
    renderReact(() => <MiscPostList/>, {user: {isAdmin: false}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('allows access for admin users', async () => {
    renderReact(() => <MiscPostList/>, {user: {isAdmin: true}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('shows at least 3 ads', async () => {
    renderReact(() => <MiscPostList/>, {user: {isAdmin: true}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(screen.getAllByTestId('ads-post-list').length).toBeGreaterThanOrEqual(1);
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('does not show ads if should not show', async () => {
    renderReact(() => <MiscPostList/>, {user: {adsFreeExpiry: new Date()}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(screen.queryByTestId('ads-post-list')).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('disables individual subscriptions if globally subscribed', async () => {
    fnFetchList = jest.spyOn(ApiRequestSender, 'miscList').mockResolvedValue({
      ...postListResponse,
      userSubscribed: true,
    });

    renderReact(() => <MiscPostList/>, {hasSession: true});

    await waitFor(() => expect(fnFetchList).toHaveBeenCalled());

    expect(await screen.findByText(translationEN.misc.subscription.remove)).toBeInTheDocument();
    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement);

    subButtons.forEach((button) => expect(button).toBeDisabled());
  });

  it('enables individual subscriptions if not globally subscribed', async () => {
    fnFetchList = jest.spyOn(ApiRequestSender, 'miscList').mockResolvedValue({
      ...postListResponse,
      userSubscribed: false,
    });

    renderReact(() => <MiscPostList/>, {hasSession: true});

    await waitFor(() => expect(fnFetchList).toHaveBeenCalled());

    expect(await screen.findByText(translationEN.misc.subscription.add)).toBeInTheDocument();
    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement);

    subButtons.forEach((button) => expect(button).toBeEnabled());
  });

  it('disables individual subscriptions after subscribing globally', async () => {
    fnFetchList = jest.spyOn(ApiRequestSender, 'miscList').mockResolvedValue({
      ...postListResponse,
      userSubscribed: false,
    });
    const fnUpdateSubscription = jest.spyOn(ApiRequestSender, 'addSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(() => <MiscPostList/>, {hasSession: true});

    await waitFor(() => expect(fnFetchList).toHaveBeenCalled());

    const subButtonGlobal = await screen.findByText(translationEN.misc.subscription.add);
    userEvent.click(subButtonGlobal);

    await waitFor(() => expect(fnUpdateSubscription).toHaveBeenCalled());

    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement as HTMLElement);
    subButtons.forEach((button) => expect(button).toBeDisabled());
  });

  it('enables individual subscriptions after unsubscribing globally', async () => {
    fnFetchList = jest.spyOn(ApiRequestSender, 'miscList').mockResolvedValue({
      ...postListResponse,
      userSubscribed: true,
    });
    const fnUpdateSubscription = jest.spyOn(ApiRequestSender, 'removeSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(() => <MiscPostList/>, {hasSession: true});

    await waitFor(() => expect(fnFetchList).toHaveBeenCalled());

    const subButtonGlobal = await screen.findByText(translationEN.misc.subscription.remove);
    userEvent.click(subButtonGlobal);

    await waitFor(() => expect(fnUpdateSubscription).toHaveBeenCalled());

    const subButtons = screen
      .getAllByText('', {selector: 'i.bi-bell,i.bi-bell-slash'})
      .map((icon) => icon.parentElement as HTMLElement);
    subButtons.forEach((button) => expect(button).toBeEnabled());
  });
});
