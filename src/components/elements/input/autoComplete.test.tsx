import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {typeInput} from '../../../../test/utils/event';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {AutoComplete} from './autoComplete';


describe('Auto-complete input', () => {
  type Payload = Array<string>;

  let payload: Payload;

  let fnRenderOption: jest.Mock;
  let fnRenderEntries: jest.Mock;

  const options = [
    'option 1',
    'option 2',
  ];

  const AutoCompleteWrapper = () => (
    <AutoComplete
      options={options}
      getText={(option) => option}
      getValue={(option) => option}
      isOptionSelected={(option) => payload.includes(option)}
      payload={payload}
      minLength={0}
      getArray={(payload) => payload}
      setArray={(options: Array<string>) => payload = options}
      renderOption={fnRenderOption}
      renderEntries={fnRenderEntries}
    />
  );

  beforeEach(() => {
    fnRenderOption = jest.fn().mockImplementation((option) => <>{option}</>);
    fnRenderEntries = jest.fn().mockImplementation((entry) => <>{entry}</>);
  });

  it('adds the clicked option', async () => {
    payload = [];

    renderReact(() => <AutoCompleteWrapper/>);

    const option = screen.getByText('option 1');
    userEvent.click(option);

    expect(payload).toStrictEqual(['option 1']);
  });

  it('shows no result if no matching options', async () => {
    payload = [];

    const {rerender} = renderReact(() => <AutoCompleteWrapper/>);

    const keywordInput = screen.getByPlaceholderText(/Enter keyword/);
    typeInput(keywordInput, 'Keyword', {rerender});

    expect(screen.getByText(translationEN.autoComplete.noMatchingOptions)).toBeInTheDocument();
  });

  it('shows none selected', async () => {
    payload = [];

    renderReact(() => <AutoCompleteWrapper/>);

    expect(screen.getByText(translationEN.autoComplete.noneSelected)).toBeInTheDocument();
  });

  it('shows all options on load', async () => {
    payload = [];

    renderReact(() => <AutoCompleteWrapper/>);

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });

  it('shows all options after clearing input', async () => {
    payload = [];

    const {rerender} = renderReact(() => <AutoCompleteWrapper/>);

    const keywordInput = screen.getByPlaceholderText(/Enter keyword/);
    typeInput(keywordInput, 'Keyword', {rerender});
    userEvent.clear(keywordInput);
    rerender();

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });

  it('removes an option', async () => {
    payload = ['option 1'];

    renderReact(() => <AutoCompleteWrapper/>);

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[0];
    userEvent.click(removeButton);

    expect(payload).toStrictEqual([]);
    // Should have 2 selectable options after removal
    expect(screen.getAllByText('', {selector: 'i.bi-plus-circle'})).toHaveLength(2);
  });

  it('does not add the same option twice', async () => {
    payload = [];

    renderReact(() => <AutoCompleteWrapper/>);

    const option = screen.getByText('option 1');
    userEvent.click(option);
    userEvent.click(option);

    expect(payload).toStrictEqual(['option 1']);
  });

  it('loads both search results and pre-selected options', async () => {
    payload = ['option 1'];

    renderReact(() => <AutoCompleteWrapper/>);

    // 1 in options section, 1 in selected section
    expect(screen.getAllByText('option 1')).toHaveLength(2);
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });
});
