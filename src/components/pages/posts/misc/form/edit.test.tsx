import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode, MiscPostGetResponse, SupportedLanguages} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {MiscEditForm} from './edit';


describe('Misc post edit form', () => {
  let fnSendRequest: jest.SpyInstance;

  const post: MiscPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 7,
    lang: SupportedLanguages.EN,
    title: 'ttl',
    sections: [{title: 'A', content: 'A1'}],
    isAltLang: false,
    otherLangs: [],
    publishedEpoch: 0,
    modifiedEpoch: 0,
    viewCount: 0,
    editNotes: [],
    userSubscribed: true,
  };

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'miscIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    fnSendRequest = jest.spyOn(ApiRequestSender, 'miscEdit').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      seqId: 7,
      emailResult: {accepted: [], rejected: []},
    });
  });

  it('attaches edit note', async () => {
    renderReact(
      () => <MiscEditForm post={post}/>,
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
      () => <MiscEditForm post={post}/>,
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeTruthy();
  });

  it('does not send update', async () => {
    renderReact(
      () => <MiscEditForm post={post}/>,
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
