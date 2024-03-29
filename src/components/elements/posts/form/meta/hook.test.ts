import {waitFor} from '@testing-library/react';

import {renderReactHook} from '../../../../../../test/render/main';
import {ApiResponseCode, PostMeta, SupportedLanguages} from '../../../../../api-def/api';
import {PostFormState} from '../types';
import {useFormMeta} from './hook';


describe('Form meta hook', () => {
  let formState: PostFormState<PostMeta>;
  let setAvailability: jest.Mock;

  beforeEach(() => {
    formState = {
      isIdAvailable: false,
      isPreloaded: false,
      payload: {
        lang: SupportedLanguages.EN,
      },
    };
    setAvailability = jest.fn().mockImplementation((available) => formState.isIdAvailable = available);
  });

  it('does not run the check if the user is not an admin', async () => {
    const fnIdCheck = jest.fn();

    const {result, rerender} = renderReactHook(
      () => useFormMeta({
        formState,
        setAvailability,
        fnIdCheck,
        getEffectDependency: (payload) => [payload.lang],
      }),
      {
        user: {
          isAdmin: false,
        },
      },
    );

    formState.payload.lang = SupportedLanguages.CHT;
    rerender();

    expect(setAvailability).toHaveBeenCalledWith(false);
    expect(fnIdCheck).not.toHaveBeenCalled();
    expect(result.current.isValid).toBeFalsy();
  });

  it('loads initial validity state', async () => {
    const fnIdCheck = jest.fn().mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });

    const {result} = renderReactHook(
      () => useFormMeta({
        formState: {
          ...formState,
          isIdAvailable: true,
        },
        setAvailability,
        fnIdCheck,
        getEffectDependency: (payload) => [payload.lang],
      }),
      {user: {isAdmin: true}},
    );

    await waitFor(() => expect(result.current.isValid).toBeTruthy());
  });

  it('returns valid if the check passed', async () => {
    jest.useFakeTimers();
    const fnIdCheck = jest.fn().mockImplementation(() => Promise.resolve({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    }));

    const {result, rerender} = renderReactHook(
      () => useFormMeta({
        formState,
        setAvailability,
        fnIdCheck,
        getEffectDependency: (payload) => [payload.lang],
      }),
      {
        user: {
          isAdmin: true,
        },
      },
    );

    formState.payload.lang = SupportedLanguages.CHT;
    rerender();

    jest.advanceTimersByTime(1100);

    await waitFor(() => expect(fnIdCheck).toHaveBeenCalled());
    expect(setAvailability).toHaveBeenCalledWith(true);
    expect(result.current.isValid).toBe(true);

    jest.useRealTimers();
  });

  it('returns invalid if the check failed', async () => {
    jest.useFakeTimers();
    const fnIdCheck = jest.fn().mockImplementation(() => Promise.resolve({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
    }));

    const {result, rerender} = renderReactHook(
      () => useFormMeta({
        formState,
        setAvailability,
        fnIdCheck,
        getEffectDependency: (payload) => [payload.lang],
      }),
      {
        user: {
          isAdmin: true,
        },
      },
    );

    formState.payload.lang = SupportedLanguages.CHT;
    rerender();

    jest.advanceTimersByTime(1100);
    rerender();

    await waitFor(() => expect(fnIdCheck).toHaveBeenCalled());
    expect(setAvailability).toHaveBeenCalledWith(false);
    expect(result.current.isValid).toBe(false);

    jest.useRealTimers();
  });
});
