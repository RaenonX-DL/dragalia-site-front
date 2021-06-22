import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {ApiResponseCode, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../../../../utils/services/api/utils';
import * as unitInfoUtils from '../../../../../../utils/services/resources/unitInfo/utils';
import {AnalysisFormCharaEdit} from './edit';


describe('Character analysis edit form', () => {
  let fnSendRequest: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    // Mocking this because the fetching promises in `getUnitNameIdMap()` do not resolve
    jest.spyOn(unitInfoUtils, 'getUnitNameIdMap').mockResolvedValue(new Map([
      ['Gala Leonidas', 10950101],
    ]));
    fnSendRequest = jest.spyOn(ApiRequestSender, 'analysisEditChara').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 10950101,
    });
  });

  it('attaches edit note', async () => {
    renderReact(
      () => (
        <AnalysisFormCharaEdit
          analysis={{
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
            story: 'str',
            keywords: 'kw',
          }}
        />
      ),
      {user: {isAdmin: true}},
    );

    const editNote = screen.getByPlaceholderText(translationEN.posts.manage.editNote);
    userEvent.type(editNote, 'Edit Note');

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].editNote).toBe('Edit Note');
  });
});
