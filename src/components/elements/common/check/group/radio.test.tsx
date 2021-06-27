import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {CheckOption} from '../types';
import {RadioGroup} from './radio';


describe('Radio checks', () => {
  const options: Array<CheckOption & {code: number}> = [
    {text: 'check 1', code: 1},
    {text: 'check 2', code: 2},
    {text: 'check 3', code: 3},
  ];

  let inputData: {selected: number};
  let setInputDataFunc: jest.Mock;

  beforeEach(() => {
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('preloads the selection', async () => {
    inputData = {selected: 2};

    renderReact(() => (
      <RadioGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData) => inputData.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        getCheckOptionComparer={(option) => option.code}
        groupName="radio"
      />
    ));

    const toggleInput = screen.getByText('check 2').parentNode?.children[0];
    expect(toggleInput).toHaveAttribute('checked');
    expect(setInputDataFunc).not.toHaveBeenCalled();
  });

  test('selecting another option changes the state', async () => {
    inputData = {selected: 2};

    renderReact(() => (
      <RadioGroup
        options={options}
        inputData={inputData}
        setInputData={setInputDataFunc}
        getValue={(inputData) => inputData.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        getCheckOptionComparer={(option) => option.code}
        groupName="radio"
      />
    ));

    const enumButton = screen.getByText('check 1');
    userEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: 1});
  });

  test('radio inputs do not conflict under different group name', async () => {
    let inputData = {
      selected: 2,
      another: 3,
    };
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);

    const {rerender} = renderReact(() => (
      <>
        <RadioGroup
          options={options}
          inputData={inputData}
          setInputData={setInputDataFunc}
          getValue={(inputData) => inputData.selected}
          getUpdatedInputData={(newValue) => ({...inputData, selected: newValue})}
          getCheckOptionComparer={(option) => option.code}
          groupName="radio"
        />
        <RadioGroup
          options={options}
          inputData={inputData}
          setInputData={setInputDataFunc}
          getValue={(inputData) => inputData.another}
          getUpdatedInputData={(newValue) => ({...inputData, another: newValue})}
          getCheckOptionComparer={(option) => option.code}
          groupName="radio"
        />
      </>
    ));

    const enum1Buttons = screen.getAllByText('check 1');
    expect(enum1Buttons.length).toBe(2);
    const enum2Buttons = screen.getAllByText('check 2');
    expect(enum2Buttons.length).toBe(2);

    userEvent.click(enum1Buttons[0]);
    rerender();
    userEvent.click(enum2Buttons[1]);
    rerender();

    expect(setInputDataFunc).toHaveBeenCalledTimes(2);
    expect(inputData).toStrictEqual({selected: 1, another: 2});
  });
});
