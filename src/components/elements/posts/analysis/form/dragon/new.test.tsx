import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../../../test/render/main';
import {
  ApiResponseCode,
  CharaAnalysisPublishPayload,
  SupportedLanguages,
  UnitType,
} from '../../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../../../../utils/services/api/utils';
import {AnalysisFormDragonNew} from './new';


describe('New dragon analysis form', () => {
  const initialPayload: CharaAnalysisPublishPayload = {
    uid: new ObjectId().toHexString(),
    lang: SupportedLanguages.EN,
    type: UnitType.CHARACTER,
    unitId: 0,
    summary: 'sum',
    summonResult: 'smr',
    passives: 'psv',
    normalAttacks: 'nra',
    forceStrikes: 'fs',
    skills: [
      generateNewCharaSkill('S1'),
      generateNewCharaSkill('S2'),
    ],
    tipsBuilds: 'tb',
    videos: 'vid',
    keywords: 'kw',
    story: 'str',
  };

  const changeToValidUnitIdAndWaitPass = async () => {
    const unitId = screen.getByDisplayValue(initialPayload.unitId);
    userEvent.clear(unitId);
    userEvent.type(unitId, '10950101');
    jest.runTimersToTime(1100);
    await waitFor(() => expect(unitId).toHaveClass('is-valid'));
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows invalid on loaded', async () => {
    renderReact(
      () => <AnalysisFormDragonNew/>,
      {user: {isAdmin: true}},
    );

    const unitId = screen.getByDisplayValue(initialPayload.unitId);
    expect(unitId).toHaveClass('is-invalid');
  });

  it('shows valid after typing in ID', async () => {
    renderReact(
      () => <AnalysisFormDragonNew/>,
      {user: {isAdmin: true}},
    );

    await changeToValidUnitIdAndWaitPass();
  });
});
