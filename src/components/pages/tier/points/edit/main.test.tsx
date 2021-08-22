import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {ApiResponseCode} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {KeyPointsEdit} from './main';


describe('Tier list key point editing UI', () => {
  let fnGetEntries: jest.SpyInstance;
  let fnUpdateEntries: jest.SpyInstance;

  beforeEach(() => {
    fnGetEntries = jest.spyOn(ApiRequestSender, 'getKeyPointsManage').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      points: [
        {
          id: 'a',
          type: 'strength',
          description: 'S1',
        },
        {
          id: 'b',
          type: 'weakness',
          description: 'W1',
        },
      ],
    });
    fnUpdateEntries = jest.spyOn(ApiRequestSender, 'updateKeyPointContent').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
  });

  it('allows updating if none of the descriptions are empty', async () => {
    const {rerender} = renderReact(
      () => <KeyPointsEdit/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    await waitFor(() => expect(fnGetEntries).toHaveBeenCalledTimes(1));

    const descriptionS1 = await screen.findByDisplayValue('S1');
    typeInput(descriptionS1, '1', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    await waitFor(() => expect(updateButton).toBeEnabled());
  });

  it('blocks updating if any of the description is empty', async () => {
    renderReact(
      () => <KeyPointsEdit/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    await waitFor(() => expect(fnGetEntries).toHaveBeenCalledTimes(1));

    const descriptionS1 = await screen.findByDisplayValue('S1');
    userEvent.clear(descriptionS1);

    const updateButton = screen.getByText(translationEN.misc.update);
    await waitFor(() => expect(updateButton).toBeDisabled());
  });

  it('sends the correct data after changing a description', async () => {
    const {rerender} = renderReact(
      () => <KeyPointsEdit/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    const descriptionS1 = await screen.findByDisplayValue('S1');
    typeInput(descriptionS1, '1', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    await waitFor(() => expect(fnUpdateEntries).toHaveBeenCalledTimes(1));
    expect(fnUpdateEntries.mock.calls[0][2]).toStrictEqual([
      {id: 'a', type: 'strength', description: 'S11'},
      {id: 'b', type: 'weakness', description: 'W1'},
    ]);
  });

  it('sends the correct data after adding a new entry', async () => {
    const {rerender} = renderReact(
      () => <KeyPointsEdit/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    const addButton = await screen.findByText('', {selector: 'i.bi-plus-lg'});
    userEvent.click(addButton);

    const descriptionS2 = screen.getByDisplayValue('');
    typeInput(descriptionS2, 'S2', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    await waitFor(() => expect(fnUpdateEntries).toHaveBeenCalledTimes(1));
    expect(fnUpdateEntries.mock.calls[0][2]).toStrictEqual([
      {type: 'strength', description: 'S2'},
      {id: 'a', type: 'strength', description: 'S1'},
      {id: 'b', type: 'weakness', description: 'W1'},
    ]);
  });

  it('blocks accessing the page anonymously', async () => {
    renderReact(() => <KeyPointsEdit/>);

    expect(screen.getByText(/Access denied/)).toBeInTheDocument();
    await waitFor(() => expect(fnGetEntries).toHaveBeenCalledTimes(0));
  });
});
