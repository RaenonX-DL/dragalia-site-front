import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {typeInput} from '../../../../../test/utils/event';
import {ApiResponseCode} from '../../../../api-def/api';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {TierNoteEdit} from './main';


describe('Unit tier note editing UI', () => {
  let fnGetEditData: jest.SpyInstance;
  let fnSubmitEdit: jest.SpyInstance;

  beforeEach(() => {
    fnGetEditData = jest.spyOn(ApiRequestSender, 'getUnitTierNoteManage').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        tier: {},
        lastUpdateEpoch: 0,
        points: [],
      },
    });
    jest.spyOn(ApiRequestSender, 'getKeyPointsManage').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      points: [
        {
          id: 'idA',
          type: 'strength',
          description: 'S1',
        },
        {
          id: 'idB',
          type: 'weakness',
          description: 'W1',
        },
      ],
    });
    fnSubmitEdit = jest.spyOn(ApiRequestSender, 'updateUnitTierNote').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
  });

  it('loads non-existing tier note', async () => {
    fnGetEditData.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: null,
    });

    renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    // Overview section loaded = page successfully loaded
    expect(await screen.findByText('Gala Leonidas')).toBeInTheDocument();
  });

  it('loads existing tier note', async () => {
    fnGetEditData.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        tier: {
          conAi: {
            ranking: 'S',
            note: 'CoN AI',
            isCompDependent: false,
          },
          conSolo: {
            ranking: 'S',
            note: 'CoN Solo',
            isCompDependent: false,
          },
        },
        points: ['idA'],
      },
    });

    renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    expect(await screen.findByText('CoN AI')).toBeInTheDocument();
    expect(screen.getByText('CoN Solo')).toBeInTheDocument();
    // Selected S rank in CoN AI and CoN Solo
    // - S rank options will have 7+ results because each corresponds to a rank option of a dimension
    expect(screen.getAllByText('S').filter((option) => (option as HTMLOptionElement).selected)).toHaveLength(2);
    // Key point: 1 for option, 1 for selected
    expect(screen.getAllByText('S1')).toHaveLength(2);
  });

  it('requires note', async () => {
    fnGetEditData.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        tier: {
          conAi: {
            ranking: 'S',
            note: 'CoN AI',
            isCompDependent: false,
          },
        },
        points: ['idA'],
      },
    });

    renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    const firstEmptySelect = (await screen.findAllByDisplayValue('-'))[0];
    userEvent.selectOptions(firstEmptySelect, 'A');

    const firstEmptyNote = screen.getAllByText('', {selector: 'textarea'})[0];
    expect(firstEmptyNote).toHaveAttribute('required');
  });

  it('sends correct payload after changing tier note', async () => {
    fnGetEditData.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        tier: {
          conAi: {
            ranking: 'S',
            note: 'CoN AI',
            isCompDependent: false,
          },
          conSolo: {
            ranking: 'B',
            note: 'CoN Solo',
            isCompDependent: false,
          },
        },
        points: ['idA'],
      },
    });

    const {rerender} = renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    // Update note
    const conAiNote = await screen.findByText('CoN AI');
    typeInput(conAiNote, ' - Update', {rerender});

    // Add note
    const firstEmptySelect = screen.getAllByDisplayValue('-')[0];
    userEvent.selectOptions(firstEmptySelect, 'A');
    const firstRequiredEmptyNote = screen.getByText('', {selector: 'textarea:required'});
    typeInput(firstRequiredEmptyNote, 'note', {rerender});

    // Remove note
    const conSoloSelect = screen.getByDisplayValue('B');
    userEvent.selectOptions(conSoloSelect, '-');

    const updateButton = screen.getByText('Update');
    userEvent.click(updateButton);

    await waitFor(() => expect(fnSubmitEdit).toHaveBeenCalledTimes(1));
    expect(fnSubmitEdit.mock.calls[0][3]).toStrictEqual({
      tier: {
        conAi: {
          ranking: 'S',
          note: 'CoN AI - Update',
          isCompDependent: false,
        },
        conCoop: {
          ranking: 'A',
          note: 'note',
          isCompDependent: false,
        },
      },
      points: ['idA'],
    });
  });

  it('sends correct payload after changing key points', async () => {
    fnGetEditData.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        tier: {
          conAi: {ranking: 'S', note: 'CoN AI', isCompDependent: false},
        },
        points: ['idA'],
      },
    });

    renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    // Delete S1
    const pointS1Remove = await screen.findByText('', {selector: 'i.bi-x-lg'});
    userEvent.click(pointS1Remove);

    // Add W1
    const pointW1 = screen.getByText('W1');
    userEvent.click(pointW1);

    const updateButton = screen.getByText('Update');
    userEvent.click(updateButton);

    await waitFor(() => expect(fnSubmitEdit).toHaveBeenCalledTimes(1));
    expect(fnSubmitEdit.mock.calls[0][3]).toStrictEqual({
      tier: {
        conAi: {ranking: 'S', note: 'CoN AI', isCompDependent: false},
      },
      points: ['idB'],
    });
  });

  it('blocks access from non-admin users', async () => {
    renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: false}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    expect(await screen.findByText(/Access denied/)).toBeInTheDocument();
  });

  it('allows access from admin users', async () => {
    renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    // Overview section loaded = page successfully loaded
    expect(await screen.findByText('Gala Leonidas')).toBeInTheDocument();
  });

  it('transforms note', async () => {
    fnGetEditData.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        tier: {conAi: {ranking: 'S', note: 'CoN AI', isCompDependent: false}},
        points: ['idA'],
      },
    });

    const {rerender} = renderReact(
      () => <TierNoteEdit/>,
      {hasSession: true, user: {isAdmin: true}, routerOptions: {query: {id: '10950101', lang: 'en'}}},
    );

    const note = await screen.findByText('CoN AI');
    typeInput(note, ' - :Summer Chelle:', {rerender});

    const updateButton = screen.getByText('Update');
    userEvent.click(updateButton);

    await waitFor(() => expect(fnSubmitEdit).toHaveBeenCalledTimes(1));
    expect(fnSubmitEdit.mock.calls[0][3]).toStrictEqual({
      tier: {conAi: {ranking: 'S', note: 'CoN AI - --10750404/Summer Chelle--', isCompDependent: false}},
      points: ['idA'],
    });
  });
});
