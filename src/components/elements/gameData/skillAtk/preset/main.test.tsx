import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode} from '../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {AttackingSkillPreset} from './main';


describe('ATK skill input preset manager', () => {
  let fnMakePreset: jest.SpyInstance;

  beforeEach(() => {
    window.location.href = 'http://localhost:3000';
    fnMakePreset = jest.spyOn(ApiRequestSender, 'setPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      presetId: 'presetLink',
    });
  });

  it('makes a preset on clicking share', async () => {
    renderReact(
      () => <AttackingSkillPreset isEnabled/>,
      {hasSession: true},
    );

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    userEvent.click(shareButton);

    await waitFor(() => expect(fnMakePreset).toHaveBeenCalled());
  });
});
