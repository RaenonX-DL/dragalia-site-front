import React from 'react';

import {expect} from '@jest/globals';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {typeInput} from '../../../../../test/utils/event';
import {TierNote} from '../mock';
import {TierNoteDimensionEntry} from './dimension';


describe('Tier note dimension entry', () => {
  let fnSetInputData: jest.Mock;

  beforeEach(() => {
    fnSetInputData = jest.fn();
  });

  it('loads tier note correctly', async () => {
    renderReact(() => (
      <TierNoteDimensionEntry
        inputData={{
          ranking: 'A',
          note: 'Note',
          isCompDependent: true,
        }}
        setInputData={fnSetInputData}
        dimension="conAi"
      />
    ));

    expect(screen.getByText(/Comp/).parentElement).toHaveClass('active');
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  it('loads tier note correctly (non comp-dependent)', async () => {
    renderReact(() => (
      <TierNoteDimensionEntry
        inputData={{
          ranking: 'A',
          note: 'Note',
          isCompDependent: false,
        }}
        setInputData={fnSetInputData}
        dimension="conAi"
      />
    ));

    expect(screen.getByText(/Comp/).parentElement).not.toHaveClass('active');
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  it('adds new tier note by selecting rank', async () => {
    renderReact(() => (
      <TierNoteDimensionEntry
        inputData={undefined}
        setInputData={fnSetInputData}
        dimension="conAi"
      />
    ));

    const select = screen.getByText('', {selector: 'select'});
    userEvent.selectOptions(select, 'A');

    expect(fnSetInputData.mock.calls[0][0]).toStrictEqual({
      ranking: 'A',
      note: '',
      isCompDependent: false,
      toDelete: false,
    });
  });

  it('updates existing tier note', async () => {
    let inputData: TierNote = {
      ranking: 'A',
      note: 'Note',
      isCompDependent: false,
    };

    fnSetInputData.mockImplementation((newData) => inputData = newData);

    const {rerender} = renderReact(() => (
      <TierNoteDimensionEntry
        inputData={inputData}
        setInputData={fnSetInputData}
        dimension="conAi"
      />
    ));

    const select = screen.getByText('Note');
    typeInput(select, 'Note', {rerender});

    expect(fnSetInputData.mock.calls[0][0].toDelete).toBeFalsy();
  });

  it('deletes tier note', async () => {
    let inputData: TierNote = {
      ranking: 'A',
      note: 'Note',
      isCompDependent: false,
    };

    fnSetInputData.mockImplementation((newData) => inputData = newData);

    renderReact(() => (
      <TierNoteDimensionEntry
        inputData={inputData}
        setInputData={fnSetInputData}
        dimension="conAi"
      />
    ));

    const select = screen.getByText('', {selector: 'select'});
    userEvent.selectOptions(select, '-');

    expect(fnSetInputData.mock.calls[0][0].toDelete).toBeTruthy();
  });

  it('disables inputs when selected "-" ranking', async () => {
    let inputData: TierNote = {
      ranking: 'A',
      note: 'Note',
      isCompDependent: false,
    };

    fnSetInputData.mockImplementation((newData) => inputData = newData);

    const {rerender} = renderReact(() => (
      <TierNoteDimensionEntry
        inputData={inputData}
        setInputData={fnSetInputData}
        dimension="conAi"
      />
    ));

    const select = screen.getByText('', {selector: 'select'});
    userEvent.selectOptions(select, '-');
    rerender();

    const note = screen.getByText('Note', {selector: 'textarea'});
    await waitFor(() => expect(note).toBeDisabled());
    const compDependent = screen.getByText(/Comp/);
    expect(compDependent.parentElement?.children[0]).toBeDisabled();
  });
});
