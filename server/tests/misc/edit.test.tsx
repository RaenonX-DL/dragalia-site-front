import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ApiResponseCode,
  MiscPostEditResponse,
  MiscPostGetResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {MiscEdit} from '../../../src/components/pages/posts/misc/edit';
import {translations} from '../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Misc edit page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetch: jest.SpyInstance;

  const response: MiscPostEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 7,
  };

  const post: MiscPostGetResponse = {
    ...response,
    lang: SupportedLanguages.EN,
    title: 'ttl',
    sections: [
      {title: 'title', content: 'content'},
    ],
    viewCount: 7,
    modifiedEpoch: 55,
    publishedEpoch: 55,
    editNotes: [],
    isAltLang: false,
    otherLangs: [],
  };

  beforeEach(() => {
    fnFetch = jest.spyOn(ApiRequestSender, 'miscGet').mockResolvedValue(post);
  });

  it('blocks access for anonymous users', async () => {
    renderReact(() => <MiscEdit/>);

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(post.sections[0].content)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users', async () => {
    renderReact(() => <MiscEdit/>, {hasSession: true});

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(post.sections[0].content)).not.toBeInTheDocument();
  });

  it('allows access for admin users', async () => {
    renderReact(() => <MiscEdit/>, {user: {isAdmin: true}});

    expect((await screen.findAllByText(post.sections[0].content)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('returns 404 if the post is not found', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <MiscEdit/>, {user: {isAdmin: true}});

    expect(await screen.findByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(post.sections[0].content)).not.toBeInTheDocument();
  });

  it('does not send payload such as `viewCount` back (chara)', async () => {
    const apiRequest = jest.spyOn(ApiRequestSender, 'miscEdit')
      .mockImplementation(async () => response);

    renderReact(() => <MiscEdit/>, {user: {isAdmin: true}});

    const editButton = await screen.findByText(translations[SupportedLanguages.EN].posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(apiRequest).toHaveBeenCalledTimes(1));

    const keys = Object.keys(apiRequest.mock.calls[0][0]);
    expect(keys).toContain('sections');
    expect(keys).not.toContain('viewCount');
  });
});
