import React from 'react';

import {screen} from '@testing-library/react';

import {
  ApiResponseCode,
  QuestPostGetResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {QuestPage} from '../../../src/components/pages/posts/quest/output';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {translations} from '../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Quest page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetch: jest.SpyInstance;

  const response: QuestPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    lang: DEFAULT_LANG,
    isAltLang: false,
    otherLangs: [],
    seqId: 0,
    title: 'ttl',
    general: 'gen',
    video: 'vid',
    positional: [],
    addendum: '',
    viewCount: 0,
    editNotes: [],
    publishedEpoch: 55,
    modifiedEpoch: 55,
  };

  beforeEach(() => {
    fnFetch = jest.spyOn(ApiRequestSender, 'questGet').mockResolvedValue(response);
  });

  it('allows access for anonymous users', async () => {
    renderReact(() => <QuestPage/>, {hasSession: false});

    expect(await screen.findByText(response.general)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for non-admin users', async () => {
    renderReact(() => <QuestPage/>, {user: {isAdmin: false}});

    expect(await screen.findByText(response.general)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for admin users', async () => {
    renderReact(() => <QuestPage/>, {user: {isAdmin: true}});

    expect(await screen.findByText(response.general)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('returns 404 if the post is not found', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <QuestPage/>);

    expect(await screen.findByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(response.general)).not.toBeInTheDocument();
  });

  it('shows at least 3 ads', async () => {
    renderReact(() => <QuestPage/>, {user: {isAdmin: true}});

    expect((await screen.findAllByTestId('ads-in-post')).length).toBeGreaterThanOrEqual(3);
  });

  it('does not show ads if should not show', async () => {
    renderReact(() => <QuestPage/>, {user: {adsFreeExpiry: new Date()}});

    expect(await screen.findByText(response.general)).toBeInTheDocument();
    expect(screen.queryByTestId('ads-in-post')).not.toBeInTheDocument();
  });
});
