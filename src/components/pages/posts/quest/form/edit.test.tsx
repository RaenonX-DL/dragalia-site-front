import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode, QuestPostGetResponse, SupportedLanguages} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {QuestEditForm} from './edit';


describe('Quest post edit form', () => {
  let fnSendRequest: jest.SpyInstance;

  const post: QuestPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 7,
    lang: SupportedLanguages.EN,
    title: 'ttl',
    general: 'gen',
    video: 'vid',
    positional: [],
    addendum: 'add',
    isAltLang: false,
    otherLangs: [],
    publishedEpoch: 0,
    modifiedEpoch: 0,
    viewCount: 0,
    editNotes: [],
    userSubscribed: false,
  };

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'questIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    fnSendRequest = jest.spyOn(ApiRequestSender, 'questEdit').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      seqId: 7,
      emailResult: {accepted: [], rejected: []},
    });
  });

  it('attaches edit note', async () => {
    renderReact(
      () => <QuestEditForm post={post}/>,
      {user: {isAdmin: true}},
    );

    const editNote = screen.getByText(translationEN.posts.manage.editNote);
    userEvent.type(editNote.previousSibling as Element, 'Edit Note');

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].editNote).toBe('Edit Note');
  });

  it('sends update email', async () => {
    renderReact(
      () => <QuestEditForm post={post}/>,
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeTruthy();
  });

  it('does not send update', async () => {
    renderReact(
      () => <QuestEditForm post={post}/>,
      {user: {isAdmin: true}},
    );

    const sendEmailCheck = screen.getByText(translationEN.posts.manage.sendUpdateEmail);
    userEvent.click(sendEmailCheck.previousSibling as Element);

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeFalsy();
  });
});
