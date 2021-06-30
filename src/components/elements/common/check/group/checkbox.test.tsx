import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {CheckOption} from '../types';
import {CheckboxGroup} from './checkbox';


describe('Checkboxes', () => {
  const options: Array<CheckOption & {code: number}> = [
    {text: 'check 1', code: 1},
    {text: 'check 2', code: 2},
    {text: 'check 3', code: 3},
  ];

  let inputData: {selected: Array<number>};

  let setInputDataFunc: jest.Mock;

  beforeEach(() => {
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('preloads the selection', async () => {
    inputData = {selected: [2, 3]};

    renderReact(() => (
      <CheckboxGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData) => inputData.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        getCheckOptionComparer={(option) => option.code}
      />
    ));

    const toggleInput = screen.getByText('check 2').parentNode?.children[0];
    expect(toggleInput).toHaveAttribute('checked');
    expect(setInputDataFunc).toHaveBeenCalledTimes(0);
  });

  it('deselect an option', async () => {
    inputData = {selected: [2]};

    renderReact(() => (
      <CheckboxGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData) => inputData.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        getCheckOptionComparer={(option) => option.code}
      />
    ));

    const enumButton = screen.getByText('check 2');
    userEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: []});
  });

  it('can select multiple options', async () => {
    inputData = {selected: []};

    const {rerender} = renderReact(() => (
      <CheckboxGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData) => inputData.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        getCheckOptionComparer={(option) => option.code}
      />
    ));

    const enum1Button = screen.getByText('check 1');
    userEvent.click(enum1Button);
    rerender();
    const enum2Button = screen.getByText('check 2');
    userEvent.click(enum2Button);

    expect(setInputDataFunc).toHaveBeenCalledTimes(2);
    expect(inputData).toStrictEqual({selected: [1, 2]});
  });

  test('selecting an option add it to the state', async () => {
    inputData = {selected: [2]};

    renderReact(() => (
      <CheckboxGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData) => inputData.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        getCheckOptionComparer={(option) => option.code}
      />
    ));

    const enumButton = screen.getByText('check 1');
    userEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: [2, 1]});
  });
});
