import React from 'react';

import {fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {
  AnalysisMeta,
  ApiResponseCode,
  OptionalSequencedPostMeta, PartiallySupportedLanguages,
  PostIdCheckResponse,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {UnitInfoMap} from '../../../../../api-def/resources';
import * as resources from '../../../../../api-def/resources/utils/unitInfo';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../../elements/posts/form/types';
import {FormAnalysisMeta} from './meta';


describe('Analysis form meta input', () => {
  type SetPayloadFuncArgs<K extends keyof AnalysisMeta> = [K, AnalysisMeta[K]];

  let state: PostFormState<AnalysisMeta>;
  let setPayload: jest.Mock<void, SetPayloadFuncArgs<keyof AnalysisMeta>>;
  let setAvailability: jest.Mock<void, [boolean]>;
  let fnIdCheck: jest.SpyInstance<Promise<PostIdCheckResponse>, [string, number, SupportedLanguages]>;
  let fnToUnitInfoMap: jest.SpyInstance;

  const name = {
    [SupportedLanguages.CHT]: 'cht',
    [SupportedLanguages.EN]: 'en',
    [SupportedLanguages.JP]: 'jp',
    [PartiallySupportedLanguages.CHS]: 'chs',
  };
  const unitInfoMap: UnitInfoMap<number> = new Map([
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
    jest.useRealTimers();
  });

  it('blocks entering string unit ID', async () => {
    const {rerender} = renderReact(() => (
      <FormAnalysisMeta
        formState={state}
        setPayload={setPayload}
        setAvailability={setAvailability}
      />
    ));
    const idField = screen.getByText(translationEN.posts.info.id);
    typeInput(idField.previousSibling as Element, 'string', {rerender});

    expect(state.payload.unitId).toBe(10950101);
    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(state.payload.unitId).toBe(10950101));
  });

  it('shows the valid mark and the unit icon upon passing the check', async () => {
    const {rerender} = renderReact(
      () => (
        <FormAnalysisMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const idField = screen.getByText(translationEN.posts.info.id);
    typeInput(idField.previousSibling as Element, '10950102', {rerender, clear: true});

    expect(fnToUnitInfoMap).toHaveBeenCalled();
    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(setAvailability).toHaveBeenCalledWith(true));
    expect(idField.previousSibling).toHaveClass('is-valid');
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

    const {rerender} = renderReact(
      () => (
        <FormAnalysisMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const idField = screen.getByText(translationEN.posts.info.id);
    typeInput(idField.previousSibling as Element, '577', {rerender});

    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(setAvailability).toHaveBeenCalledWith(false));
    expect(idField.previousSibling).toHaveClass('is-invalid');
  });

  it('starts checking 1 sec later after the last unit ID change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormAnalysisMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const idField = screen.getByText(translationEN.posts.info.id);
    typeInput(idField.previousSibling as Element, '577', {rerender});

    jest.advanceTimersByTime(1100);
    expect(setPayload).toHaveBeenCalledTimes(3);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('starts checking 1 sec later after the last lang change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormAnalysisMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const langField = screen.getByTestId('langSelect');
    fireEvent.change(langField, {target: {value: SupportedLanguages.JP}});
    rerender();

    jest.advanceTimersByTime(1100);
    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('does not start the check within 1 sec of the change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormAnalysisMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const langField = screen.getByTestId('langSelect');
    fireEvent.change(langField, {target: {value: SupportedLanguages.JP}});
    rerender();

    jest.advanceTimersByTime(100);
    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(fnIdCheck).toHaveBeenCalledTimes(0);
  });
});
