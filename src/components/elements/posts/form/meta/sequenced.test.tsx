import React from 'react';

import {fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {
  ApiResponseCode,
  OptionalSequencedPostMeta,
  PostIdCheckResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {PostFormState} from '../types';
import {FormSequencedMeta} from './sequenced';


describe('Sequenced form meta input', () => {
  type SetPayloadFuncArgs<K extends keyof OptionalSequencedPostMeta> = [K, OptionalSequencedPostMeta[K]]

  let state: PostFormState<OptionalSequencedPostMeta>;
  let setPayload: jest.Mock<void, SetPayloadFuncArgs<keyof OptionalSequencedPostMeta>>;
  let setAvailability: jest.Mock<void, [boolean]>;
  const titlePlaceholder = 'Title';
  let fnIdCheck: jest.Mock<Promise<PostIdCheckResponse>, [string, number | null, SupportedLanguages]>;

  beforeEach(() => {
    jest.useFakeTimers();
    state = {
      payload: {
        lang: SupportedLanguages.CHT,
        title: 'Some title',
      },
      isIdAvailable: false,
      isPreloaded: false,
    };
    setPayload = jest.fn().mockImplementation((key: keyof OptionalSequencedPostMeta, value: string) => {
      // @ts-ignore
      state.payload[key] = value;
    });
    setAvailability = jest.fn().mockImplementation((availability) => state.isIdAvailable = availability);
    fnIdCheck = jest.fn().mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
      isAdmin: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows the valid mark upon passing the check', async () => {
    const {rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(idField, '577', {rerender});

    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(setAvailability).toHaveBeenCalledWith(true));
    expect(idField).toHaveClass('is-valid');
  });

  it('shows the invalid mark upon failing the check', async () => {
    setAvailability = jest.fn().mockImplementation(() => state.isIdAvailable = false);
    fnIdCheck = jest.fn().mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
      isAdmin: true,
    });

    const {rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(idField, '577', {rerender});

    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(setAvailability).toHaveBeenCalledWith(false));
    expect(idField).toHaveClass('is-invalid');
  });

  it('starts checking 1 sec later after the last seq ID change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const idField = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(idField, '577', {rerender});

    jest.advanceTimersByTime(1100);
    expect(setPayload).toHaveBeenCalledTimes(3);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('starts checking 1 sec later after the last title change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const titleField = screen.getByPlaceholderText(titlePlaceholder);
    typeInput(titleField, 'Another Title', {rerender});

    jest.advanceTimersByTime(1100);
    expect(setPayload).toHaveBeenCalledTimes(13);
    expect(fnIdCheck).toHaveBeenCalledTimes(1);
  });

  it('starts checking 1 sec later after the last lang change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
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

  it('cannot change language if preloaded', async () => {
    state.isPreloaded = true;

    const {container, rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
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

    expect(container).toHaveTextContent(SupportedLanguageNames[state.payload.lang]);
  });

  it('does not start the check within 1 sec of the change', async () => {
    const {rerender} = renderReact(
      () => (
        <FormSequencedMeta
          formState={state}
          setPayload={setPayload}
          setAvailability={setAvailability}
          titlePlaceholder={titlePlaceholder}
          fnIdCheck={fnIdCheck}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );
    const titleField = screen.getByPlaceholderText(titlePlaceholder);
    typeInput(titleField, 'Another Title', {rerender});

    jest.advanceTimersByTime(100);
    expect(setPayload).toHaveBeenCalledTimes(13);
    expect(fnIdCheck).toHaveBeenCalledTimes(0);
  });
});
