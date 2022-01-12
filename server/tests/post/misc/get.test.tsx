import React from 'react';

import {screen} from '@testing-library/react';

import {DEFAULT_LANG, ApiResponseCode, MiscPostGetResponse, SupportedLanguages} from '../../../../src/api-def/api';
import {MiscPage} from '../../../../src/components/pages/posts/misc/output';
import {translations} from '../../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../../test/render/main';


describe('Misc page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetch: jest.SpyInstance;

  const response: MiscPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    lang: DEFAULT_LANG,
    isAltLang: false,
    otherLangs: [],
    seqId: 0,
    title: 'ttl',
    sections: [
      {title: 'title', content: 'content'},
    ],
    viewCount: 0,
    editNotes: [],
    publishedEpoch: 55,
    modifiedEpoch: 55,
  };

  beforeEach(() => {
    fnFetch = jest.spyOn(ApiRequestSender, 'miscGet').mockResolvedValue(response);
  });

  it('allows access for anonymous users', async () => {
    renderReact(() => <MiscPage/>, {hasSession: false});

    expect(await screen.findByText(response.sections[0].content)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for non-admin users', async () => {
    renderReact(() => <MiscPage/>, {user: {isAdmin: false}});

    expect(await screen.findByText(response.sections[0].content)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for admin users', async () => {
    renderReact(() => <MiscPage/>, {user: {isAdmin: true}});

    expect(await screen.findByText(response.sections[0].content)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('returns 404 if the post is not found', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <MiscPage/>);

    expect(await screen.findByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(response.sections[0].content)).not.toBeInTheDocument();
  });

  it('shows at least 2 ads', async () => {
    renderReact(() => <MiscPage/>, {user: {isAdmin: true}});

    expect((await screen.findAllByTestId('ads-in-post')).length).toBeGreaterThanOrEqual(2);
  });

  it('does not show ads if should not show', async () => {
    renderReact(() => <MiscPage/>, {user: {adsFreeExpiry: new Date()}});

    expect(await screen.findByText(response.sections[0].content)).toBeInTheDocument();
    expect(screen.queryByTestId('ads-in-post')).not.toBeInTheDocument();
  });
});
