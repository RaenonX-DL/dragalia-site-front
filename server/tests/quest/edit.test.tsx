import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuestEdit from '../../../pages/[lang]/quest/[pid]/edit';
import {
  ApiResponseCode,
  QuestPostEditResponse,
  QuestPostGetResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {translations} from '../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Quest edit page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

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

  it('blocks access for anonymous users', () => {
    renderReact(() => <QuestEdit response={questPost}/>);

    expect(screen.queryByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(questPost.video)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users', () => {
    renderReact(
      () => <QuestEdit response={questPost}/>,
      {hasSession: true},
    );

    expect(screen.queryByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(questPost.video)).not.toBeInTheDocument();
  });

  it('allows access for admin users', () => {
    renderReact(
      () => <QuestEdit response={questPost}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryAllByText(questPost.video).length).toBeGreaterThan(0);
  });

  it('returns 404 if the post is not found', () => {
    renderReact(
      () => <QuestEdit response={null}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(questPost.video)).not.toBeInTheDocument();
  });

  it('does not send payload such as `viewCount` back (chara)', async () => {
    const apiRequest = jest.spyOn(ApiRequestSender, 'questEdit')
      .mockImplementation(async () => response);

    renderReact(
      () => <QuestEdit response={questPost}/>,
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translations[SupportedLanguages.EN].posts.manage.edit);
    userEvent.click(editButton);

    expect(apiRequest).toHaveBeenCalledTimes(1);

    const keys = Object.keys(apiRequest.mock.calls[0][0]);
    expect(keys).toContain('addendum');
    expect(keys).not.toContain('viewCount');
  });
});
