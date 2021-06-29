import {waitFor} from '@testing-library/react';

import {renderReactHook} from '../../../../../../test/render/main';
import {ApiResponseCode} from '../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {generateInputData} from '../in/utils/inputData';
import {PRESET_QUERY_NAME, useAtkSkillInput} from './preset';


describe('Input preset hook', () => {
  let fnOnNotLoggedIn: jest.Mock;

  beforeEach(() => {
    fnOnNotLoggedIn = jest.fn();
  });

  it('does not invoke callback if the user is anonymous but not using preset', async () => {
    renderReactHook(() => useAtkSkillInput(fnOnNotLoggedIn));

    expect(fnOnNotLoggedIn).not.toHaveBeenCalled();
  });

  it('invokes callback if the user is anonymous and attempt to use preset', async () => {
    renderReactHook(
      () => useAtkSkillInput(fnOnNotLoggedIn),
      {routerOptions: {query: {[PRESET_QUERY_NAME]: 'preset'}}},
    );

    expect(fnOnNotLoggedIn).toHaveBeenCalledTimes(1);
  });

  it('returns the input data with preset applied', async () => {
    jest.spyOn(ApiRequestSender, 'getPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      preset: generateInputData({display: {damageDist: true}}),
    });

    const {result} = renderReactHook(
      () => useAtkSkillInput(fnOnNotLoggedIn),
      {
        hasSession: true,
        routerOptions: {query: {[PRESET_QUERY_NAME]: 'preset'}},
      },
    );

    await waitFor(() => expect(result.current.getPresetStatus.fetched).toBeTruthy());
    expect(result.current.inputData.display.damageDist).toBeTruthy();
  });

  it('applies preset where only part of it matches', async () => {
    jest.spyOn(ApiRequestSender, 'getPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      preset: {display: {actualDamage: true}},
    });

    const {result} = renderReactHook(
      () => useAtkSkillInput(fnOnNotLoggedIn),
      {
        hasSession: true,
        routerOptions: {query: {[PRESET_QUERY_NAME]: 'preset'}},
      },
    );

    await waitFor(() => expect(result.current.getPresetStatus.fetched).toBeTruthy());
    expect(result.current.inputData.display.actualDamage).toBeTruthy();
  });

  it('does not apply preset if none of the key match', async () => {
    jest.spyOn(ApiRequestSender, 'getPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      preset: {a: true},
    });

    const {result} = renderReactHook(
      () => useAtkSkillInput(fnOnNotLoggedIn),
      {
        hasSession: true,
        routerOptions: {query: {[PRESET_QUERY_NAME]: 'preset'}},
      },
    );

    await waitFor(() => expect(result.current.getPresetStatus.fetched).toBeTruthy());
    expect(result.current.inputData).toStrictEqual(generateInputData());
  });

  it('returns template input data if preset ID not specified', async () => {
    const {result} = renderReactHook(() => useAtkSkillInput(fnOnNotLoggedIn));

    await waitFor(() => expect(result.current.getPresetStatus.fetched).toBeTruthy());
    expect(result.current.inputData).toStrictEqual(generateInputData());
  });

  it('records via GA that an user tried to use a preset', async () => {
    jest.spyOn(ApiRequestSender, 'getPresetAtkSkill').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      preset: {a: true},
    });
    const gaEvent = jest.spyOn(GoogleAnalytics, 'presetLoaded');

    const {result} = renderReactHook(
      () => useAtkSkillInput(fnOnNotLoggedIn),
      {
        hasSession: true,
        routerOptions: {query: {[PRESET_QUERY_NAME]: 'preset'}},
      },
    );

    await waitFor(() => expect(result.current.getPresetStatus.fetched).toBeTruthy());
    expect(gaEvent).toHaveBeenCalledTimes(1);
  });
});
