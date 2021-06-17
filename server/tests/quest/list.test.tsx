import React from 'react';

import {screen} from '@testing-library/react';

import QuestList from '../../../pages/[lang]/quest';
import {
  ApiResponseCode,
  QuestPostListResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {translations} from '../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Quest listing page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let postListFunc: jest.SpyInstance;
  const postListResponse: QuestPostListResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    startIdx: 0,
    postCount: 0,
    posts: [],
  };

  beforeEach(() => {
    postListFunc = jest.spyOn(ApiRequestSender, 'questList')
      .mockImplementation(() => Promise.resolve(postListResponse));
  });

  it('allows access for anonymous users', () => {
    renderReact(
      () => <QuestList/>,
      {hasSession: false},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(postListFunc).toHaveBeenCalledTimes(1);
  });

  it('allows access for non-admin users', () => {
    renderReact(
      () => <QuestList/>,
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(postListFunc).toHaveBeenCalledTimes(1);
  });

  it('allows access for admin users', () => {
    renderReact(
      () => <QuestList/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(postListFunc).toHaveBeenCalledTimes(1);
  });

  it('shows at least 3 ads', () => {
    renderReact(
      () => <QuestList/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryAllByTestId('ads-post-list').length).toBeGreaterThanOrEqual(1);
    expect(postListFunc).toHaveBeenCalledTimes(1);
  });

  it('does not show ads if should not show', () => {
    renderReact(
      () => <QuestList/>,
      {user: {adsFreeExpiry: new Date()}},
    );

    expect(screen.queryByTestId('ads-post-list')).not.toBeInTheDocument();
    expect(postListFunc).toHaveBeenCalledTimes(1);
  });
});
