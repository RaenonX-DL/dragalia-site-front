import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode} from '../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PRESET_QUERY_NAME} from '../hooks/preset';
import {generateInputData} from '../in/utils/inputData';
import {AttackingSkillPreset} from './main';


describe('ATK skill input preset manager', () => {
  let fnMakePreset: jest.SpyInstance;

  beforeEach(() => {
    window.location.href = 'http://localhost:3000';
    // @ts-ignore
    // noinspection JSConstantReassignment
    navigator.clipboard = {writeText: jest.fn().mockResolvedValue(void 0)};
    fnMakePreset = jest.spyOn(ApiRequestSender, 'setPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      presetId: 'presetLink',
    });
  });

  it('makes a preset on clicking share', async () => {
    const inputData = generateInputData();
    renderReact(
      () => <AttackingSkillPreset inputData={inputData} isEnabled/>,
      {hasSession: true},
    );

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    userEvent.click(shareButton);

    await waitFor(() => expect(fnMakePreset).toHaveBeenCalled());
    expect(fnMakePreset.mock.calls[0][1]).toBe(inputData);
  });

  it('shows clipboard icon and link after making a preset and copied once', async () => {
    jest.useFakeTimers();

    renderReact(
      () => <AttackingSkillPreset inputData={generateInputData()} isEnabled/>,
      {hasSession: true},
    );

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    userEvent.click(shareButton);

    await waitFor(() => expect(fnMakePreset).toHaveBeenCalled());
    jest.runTimersToTime(7000);
    await waitFor(() => expect(screen.getByText('', {selector: 'i.bi-clipboard'})).toBeInTheDocument());
    expect(screen.getByDisplayValue(`http://localhost/?${PRESET_QUERY_NAME}=presetLink`)).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('copies the correct link if re-copy', async () => {
    jest.useFakeTimers();

    renderReact(
      () => <AttackingSkillPreset inputData={generateInputData()} isEnabled/>,
      {hasSession: true},
    );

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    userEvent.click(shareButton);

    await waitFor(() => expect(fnMakePreset).toHaveBeenCalled());
    jest.runTimersToTime(7000);

    const clipboardButton = screen.getByText('', {selector: 'i.bi-clipboard'});
    userEvent.click(clipboardButton);

    const expectedLink = `http://localhost/?${PRESET_QUERY_NAME}=presetLink`;
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith(expectedLink));

    jest.useRealTimers();
  });

  it('does not have 2 preset IDs in the new link if created twice', async () => {
    jest.spyOn(ApiRequestSender, 'getPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      preset: {a: true},
    });
    window.location.href = `http://localhost/?${PRESET_QUERY_NAME}=preset`;

    renderReact(
      () => <AttackingSkillPreset inputData={generateInputData()} isEnabled/>,
      {
        hasSession: true,
        routerOptions: {query: {[PRESET_QUERY_NAME]: 'preset'}},
      },
    );

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    userEvent.click(shareButton);

    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled());
    const copiedLink = (navigator.clipboard.writeText as jest.Mock).mock.calls[0][0];
    expect(new URL(copiedLink).searchParams.getAll(PRESET_QUERY_NAME).length).toBe(1);
  });
});
