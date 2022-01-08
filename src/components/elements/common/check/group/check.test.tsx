import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {CheckOption} from '../types';
import {CheckGroup} from './check';


describe('Checkboxes', () => {
  const options: Array<CheckOption & {code: number}> = [
    {text: 'check 1', code: 1},
    {text: 'check 2', code: 2},
    {text: 'check 3', code: 3},
  ];

  type Input = {selected: number[], selected2?: number[]};
  let inputData: Input;

  let setInputDataFunc: jest.Mock;
  let getUpdatedDataFunc1: jest.Mock;
  let getUpdatedDataFunc2: jest.Mock;

  beforeEach(() => {
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);
    getUpdatedDataFunc1 = jest.fn();
    getUpdatedDataFunc2 = jest.fn();
  });

  it('preloads the selection', async () => {
    inputData = {selected: [2, 3]};

    renderReact(() => (
      <CheckGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData: Input) => inputData.selected}
        getValueOfOption={(option) => option.code}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    const toggleInput = screen.getByText('check 2').parentNode?.nextSibling;
    expect(toggleInput).toHaveAttribute('checked');
    expect(setInputDataFunc).toHaveBeenCalledTimes(0);
  });

  it('deselect an option', async () => {
    inputData = {selected: [2]};

    renderReact(() => (
      <CheckGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData: Input) => inputData.selected}
        getValueOfOption={(option) => option.code}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
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
      <CheckGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData: Input) => inputData.selected}
        getValueOfOption={(option) => option.code}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
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

  test('selecting an option adds it to the state', async () => {
    inputData = {selected: [2]};

    renderReact(() => (
      <CheckGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData: Input) => inputData.selected}
        getValueOfOption={(option) => option.code}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    const enumButton = screen.getByText('check 1');
    userEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: [2, 1]});
  });

  it('calls correct function for getting the updated input data', async () => {
    inputData = {selected: [2], selected2: [2]};

    renderReact(() => (
      <>
        <CheckGroup
          options={options}
          inputData={inputData}
          setInputData={setInputDataFunc}
          getValue={(inputData: Input) => inputData.selected}
          getValueOfOption={(option) => option.code}
          getUpdatedInputData={getUpdatedDataFunc1}
        />
        <CheckGroup
          options={options}
          inputData={inputData}
          setInputData={setInputDataFunc}
          getValue={(inputData: Input) => inputData.selected2 || []}
          getValueOfOption={(option) => option.code}
          getUpdatedInputData={getUpdatedDataFunc2}
        />
      </>
    ));

    userEvent.click(screen.getAllByText('check 1')[0]);
    userEvent.click(screen.getAllByText('check 1')[1]);

    expect(getUpdatedDataFunc1).toHaveBeenCalledTimes(1);
    expect(getUpdatedDataFunc2).toHaveBeenCalledTimes(1);
  });
});
