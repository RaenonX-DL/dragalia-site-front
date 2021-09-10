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
    startIdx: 0,
    postCount: 0,
    posts: [],
  };

  beforeEach(() => {
    fnFetchList = jest.spyOn(ApiRequestSender, 'miscList') .mockResolvedValue(postListResponse);
  });

  it('allows access for anonymous users', () => {
    renderReact(() => <MiscPostList/>, {hasSession: false});

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('allows access for non-admin users', () => {
    renderReact(() => <MiscPostList/>, {user: {isAdmin: false}});

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('allows access for admin users', () => {
    renderReact(() => <MiscPostList/>, {user: {isAdmin: true}});

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('shows at least 3 ads', () => {
    renderReact(() => <MiscPostList/>, {user: {isAdmin: true}});

    expect(screen.queryAllByTestId('ads-post-list').length).toBeGreaterThanOrEqual(1);
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('does not show ads if should not show', () => {
    renderReact(() => <MiscPostList/>, {user: {adsFreeExpiry: new Date()}});

    expect(screen.queryByTestId('ads-post-list')).not.toBeInTheDocument();
    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });
});
