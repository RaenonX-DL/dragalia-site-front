import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {ApiResponseCode} from '../../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {AnalysisFormCharaNew} from './new';


describe('New character analysis form', () => {
  const changeToValidUnitIdAndWaitPass = async () => {
    const unitId = screen.getByDisplayValue(0);
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
      () => <AnalysisFormCharaNew/>,
      {user: {isAdmin: true}},
    );

    const unitId = screen.getByDisplayValue(0);
    expect(unitId).toHaveClass('is-invalid');
  });

  it('shows valid after typing in ID', async () => {
    renderReact(
      () => <AnalysisFormCharaNew/>,
      {user: {isAdmin: true}},
    );

    await changeToValidUnitIdAndWaitPass();
  });
});
