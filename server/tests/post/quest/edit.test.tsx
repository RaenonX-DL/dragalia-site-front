import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ApiResponseCode,
  QuestPostEditResponse,
  QuestPostGetResponse,
  SupportedLanguages,
} from '../../../../src/api-def/api';
import {QuestEdit} from '../../../../src/components/pages/posts/quest/edit';
import {translations} from '../../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../../test/render/main';


describe('Quest edit page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetch: jest.SpyInstance;

  const response: QuestPostEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 7,
  };

  const questPost: QuestPostGetResponse = {
    ...response,
    lang: SupportedLanguages.EN,
    title: 'ttl',
    general: 'gen',
    video: 'vid',
    positional: [],
    addendum: 'adm',
    viewCount: 7,
    modifiedEpoch: 55,
    publishedEpoch: 55,
    editNotes: [],
    isAltLang: false,
    otherLangs: [],
  };

  beforeEach(() => {
    fnFetch = jest.spyOn(ApiRequestSender, 'questGet').mockResolvedValue(questPost);
  });

  it('blocks access for anonymous users', async () => {
    renderReact(() => <QuestEdit/>);

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(questPost.video)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users', async () => {
    renderReact(() => <QuestEdit/>, {hasSession: true});

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(questPost.video)).not.toBeInTheDocument();
  });

  it('allows access for admin users', async () => {
    renderReact(() => <QuestEdit/>, {user: {isAdmin: true}});

    expect((await screen.findAllByText(questPost.video)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('returns 404 if the post is not found', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <QuestEdit/>, {user: {isAdmin: true}});

    expect(await screen.findByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(questPost.video)).not.toBeInTheDocument();
  });

  it('does not send payload such as `viewCount` back (chara)', async () => {
    const apiRequest = jest.spyOn(ApiRequestSender, 'questEdit')
      .mockImplementation(async () => response);

    renderReact(() => <QuestEdit/>, {user: {isAdmin: true}});

    const editButton = await screen.findByText(translations[SupportedLanguages.EN].posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(apiRequest).toHaveBeenCalledTimes(1));

    const keys = Object.keys(apiRequest.mock.calls[0][0]);
    expect(keys).toContain('addendum');
    expect(keys).not.toContain('viewCount');
  });
});
