import React from 'react';

import {screen} from '@testing-library/react';

import {ApiResponseCode, QuestPostListResponse, SupportedLanguages} from '../../../../src/api-def/api';
import {QuestPostList} from '../../../../src/components/pages/posts/quest/list/list';
import {translations} from '../../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../../test/render/main';


describe('Quest listing page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetchPostList: jest.SpyInstance;
  const postListResponse: QuestPostListResponse = {
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
    fnFetchPostList = jest.spyOn(ApiRequestSender, 'questList').mockResolvedValue(postListResponse);
  });

  it('allows access for anonymous users', async () => {
    renderReact(() => <QuestPostList/>, {hasSession: false});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(fnFetchPostList).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for non-admin users', async () => {
    renderReact(() => <QuestPostList/>, {user: {isAdmin: false}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(fnFetchPostList).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for admin users', async () => {
    renderReact(() => <QuestPostList/>, {user: {isAdmin: true}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(fnFetchPostList).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('shows at least 3 ads', async () => {
    renderReact(() => <QuestPostList/>, {user: {isAdmin: true}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(screen.getAllByTestId('ads-post-list').length).toBeGreaterThanOrEqual(1);
    expect(fnFetchPostList).toHaveBeenCalledTimes(1);
  });

  it('does not show ads if should not show', async () => {
    renderReact(() => <QuestPostList/>, {user: {adsFreeExpiry: new Date()}});

    expect(await screen.findByText('title')).toBeInTheDocument();
    expect(fnFetchPostList).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('ads-post-list')).not.toBeInTheDocument();
  });
});
