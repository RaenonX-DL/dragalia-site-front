import React from 'react';

import {screen} from '@testing-library/react';

import {ApiResponseCode, MiscPostListResponse, SupportedLanguages} from '../../../../src/api-def/api';
import {MiscPostList} from '../../../../src/components/pages/posts/misc/list/list';
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
    posts: [
      {
        lang: SupportedLanguages.EN,
        seqId: 1,
        title: 'title',
        viewCount: 7,
        modifiedEpoch: 0,
        publishedEpoch: 0,
      },
    ],
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
});
