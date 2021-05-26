import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {
  AnalysisMeta,
  ApiResponseCode,
  OptionalSequencedPostMeta,
  PostIdCheckResponse,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {UnitInfoMap} from '../../../../../api-def/resources';
import * as resources from '../../../../../api-def/resources/utils/unitInfo';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../shared/form/types';
import {FormAnalysisMeta} from './meta';


describe('Analysis form meta input', () => {
  type SetPayloadFuncArgs<K extends keyof AnalysisMeta> = [K, AnalysisMeta[K]]

  let state: PostFormState<AnalysisMeta>;
  let setPayload: jest.Mock<void, SetPayloadFuncArgs<keyof AnalysisMeta>>;
  let setAvailability: jest.Mock<void, [boolean]>;
  let fnIdCheck: jest.SpyInstance<Promise<PostIdCheckResponse>, [string, number, SupportedLanguages]>;
  let fnToUnitInfoMap: jest.SpyInstance;

  const name = {
    [SupportedLanguages.CHT]: 'cht',
    [SupportedLanguages.EN]: 'en',
    [SupportedLanguages.JP]: 'jp',
  };
  const unitInfoMap: UnitInfoMap = new Map([
    [
      10950102,
      {
        type: UnitType.CHARACTER,
        name,
        iconName: 'icon',
        id: 10950102,
        element: 0,
        rarity: 6,
        cvEn: name,
        cvJp: name,
        releaseEpoch: 0,
      },
    ],
  ]);

  beforeEach(() => {
    jest.useFakeTimers();

    state = {
      payload: {
        lang: SupportedLanguages.CHT,
        unitId: 10950101,
      },
      isIdAvailable: false,
      isPreloaded: false,
    };
    setPayload = jest.fn().mockImplementation((key: keyof OptionalSequencedPostMeta, value: string) => {
      // @ts-ignore
      state.payload[key] = value;
    });
    setAvailability = jest.fn().mockImplementation((availability) => state.isIdAvailable = availability);
    fnIdCheck = jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockImplementation(async () => ({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
      isAdmin: true,
    }));
    fnToUnitInfoMap = jest.spyOn(resources, 'toUnitInfoMap').mockImplementation(() => unitInfoMap);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('blocks entering string unit ID', async () => {
    const {rerender} = await renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 'string'}});
    rerender();

    expect(state.payload.unitId).toBe(10950101);
    act(() => {
      jest.runTimersToTime(1100);
    });
    await waitFor(() => {
      rerender();
      expect(state.payload.unitId).toBe(10950101);
    });
  });

  it('shows the valid mark and the unit icon upon passing the check', async () => {
    const {rerender} = await renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 10950102}});
    rerender();

    await waitFor(() => {
      expect(fnToUnitInfoMap).toHaveBeenCalled();
    });
    act(() => {
      jest.runTimersToTime(1100);
    });
    await waitFor(() => {
      expect(setAvailability).toHaveBeenCalledWith(true);
      rerender();
      expect(idField).toHaveClass('is-valid');
    });
    screen.getByAltText(name[SupportedLanguages.EN]);
  });

  it('shows the invalid mark upon failing the check', async () => {
    setAvailability = jest.fn().mockImplementation(() => state.isIdAvailable = false);
    fnIdCheck = jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockImplementation(async () => ({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
      isAdmin: true,
    }));

    const {rerender} = await renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 577}});
    rerender();

    act(() => {
      jest.runTimersToTime(1100);
    });
    await waitFor(() => {
      expect(setAvailability).toHaveBeenCalledWith(false);
      rerender();
      expect(idField).toHaveClass('is-invalid');
    });
  });

  it('starts checking 1 sec later after the last unit ID change', async () => {
    const {rerender} = await renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    fireEvent.change(idField, {target: {value: 577}});
    rerender();

    await waitFor(() => {
      jest.runTimersToTime(1100);
      expect(setPayload).toHaveBeenCalledTimes(1);
      expect(fnIdCheck).toHaveBeenCalledTimes(1);
    });
  });

  it('starts checking 1 sec later after the last lang change', async () => {
    const {rerender} = await renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const langField = screen.getByTestId('langSelect');
    fireEvent.change(langField, {target: {value: SupportedLanguages.JP}});
    rerender();

    await waitFor(() => {
      jest.runTimersToTime(1100);
      expect(setPayload).toHaveBeenCalledTimes(1);
      expect(fnIdCheck).toHaveBeenCalledTimes(1);
    });
  });

  it('does not start the check within 1 sec of the change', async () => {
    const {rerender} = await renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const langField = screen.getByTestId('langSelect');
    fireEvent.change(langField, {target: {value: SupportedLanguages.JP}});
    rerender();

    await waitFor(() => {
      jest.runTimersToTime(100);
      expect(setPayload).toHaveBeenCalledTimes(1);
    });
    expect(fnIdCheck).toHaveBeenCalledTimes(0);
  });
});
