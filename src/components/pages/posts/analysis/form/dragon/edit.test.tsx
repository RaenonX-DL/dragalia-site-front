import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {ApiResponseCode, DragonAnalysisBody, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {AnalysisFormDragonEdit} from './edit';


describe('Dragon analysis edit form', () => {
  let fnSendRequest: jest.SpyInstance;

  const analysis: DragonAnalysisBody = {
    unitId: 20950101,
    lang: SupportedLanguages.EN,
    type: UnitType.DRAGON,
    summary: 'summary',
    summonResult: 'smn',
    passives: 'psv',
    normalAttacks: 'nrm',
    ultimate: 'ult',
    suitableCharacters: 'sut',
    notes: 'not',
    videos: 'vid',
  };

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    fnSendRequest = jest.spyOn(ApiRequestSender, 'analysisEditDragon').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 20950101,
      emailResult: {accepted: [], rejected: []},
    });
  });

  it('attaches edit note', async () => {
    renderReact(
      () => <AnalysisFormDragonEdit analysis={analysis}/>,
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
      () => <AnalysisFormDragonEdit analysis={analysis}/>,
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeTruthy();
  });

  it('does not send update', async () => {
    renderReact(
      () => <AnalysisFormDragonEdit analysis={analysis}/>,
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
