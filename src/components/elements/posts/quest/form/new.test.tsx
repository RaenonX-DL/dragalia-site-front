import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {ApiResponseCode} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {QuestNewForm} from './new';


describe('New quest post form', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(ApiRequestSender, 'questIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows valid on loaded', async () => {
    renderReact(
      () => <QuestNewForm/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByPlaceholderText(translationEN.posts.info.id);
    expect(seqId).toHaveClass('is-valid');
  });

  it('shows valid after typing in valid ID', async () => {
    const {rerender} = renderReact(
      () => <QuestNewForm/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(seqId, '7', {clear: true, rerender});
    jest.runTimersToTime(1100);

    expect(seqId).toHaveClass('is-valid');
  });

  it('shows invalid after typing in invalid ID', async () => {
    jest.spyOn(ApiRequestSender, 'questIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
    });

    const {rerender} = renderReact(
      () => <QuestNewForm/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(seqId, '7', {clear: true, rerender});
    jest.runTimersToTime(1100);

    await waitFor(() => expect(seqId).toHaveClass('is-invalid'));
  });
});
