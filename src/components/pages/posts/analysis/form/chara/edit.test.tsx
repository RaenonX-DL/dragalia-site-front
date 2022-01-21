import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {ApiResponseCode, CharaAnalysisBody, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../../../../utils/services/api/utils';
import {AnalysisFormCharaEdit} from './edit';


describe('Character analysis edit form', () => {
  let fnSendRequest: jest.SpyInstance;

  const analysis: CharaAnalysisBody = {
    unitId: 10950101,
    lang: SupportedLanguages.EN,
    type: UnitType.CHARACTER,
    summary: 'summary',
    summonResult: 'smn',
    passives: 'psv',
    normalAttacks: 'nrm',
    forceStrikes: 'fs',
    skills: [
      generateNewCharaSkill('S1'),
      generateNewCharaSkill('S2'),
    ],
    tipsBuilds: 'tb',
    videos: 'vid',
  };

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    fnSendRequest = jest.spyOn(ApiRequestSender, 'analysisEditChara').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 10950101,
      emailResult: {accepted: [], rejected: []},
    });
  });

  it('attaches edit note', async () => {
    renderReact(
      () => <AnalysisFormCharaEdit analysis={analysis}/>,
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
      () => <AnalysisFormCharaEdit analysis={analysis}/>,
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeTruthy();
  });

  it('does not send update', async () => {
    renderReact(
      () => <AnalysisFormCharaEdit analysis={analysis}/>,
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
