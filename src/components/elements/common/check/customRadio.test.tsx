import React from 'react';

import {fireEvent, screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {CustomRadios} from './customRadio';
import {CheckEntry} from './types';

describe('Radio checks', () => {
  const options: Array<CheckEntry> = [
    {
      text: 'check 1',
      code: 1,
    },
    {
      text: 'check 2',
      code: 2,
    },
    {
      text: 'check 3',
      code: 3,
    },
  ];

  let inputData: {selected: number};

  let setInputDataFunc: jest.Mock<void, [{selected: number}]>;

  beforeEach(() => {
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('preloads the selection', async () => {
    inputData = {selected: 2};

    await renderReact(
      <CustomRadios
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const toggleInput = screen.getByTestId('check 2').children[0];
    expect(toggleInput).toHaveAttribute('checked');
    expect(setInputDataFunc).toHaveBeenCalledTimes(0);
  });

  test('selecting another option changes the state', async () => {
    inputData = {selected: 2};

    await renderReact(
      <CustomRadios
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const enumButton = screen.getByText('check 1');
    fireEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: 1});
  });

  test('radio inputs do not conflict under different group name', async () => {
    let inputData = {
      selected: 2,
      another: 3,
    };
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);

    const invokeRerender = (rerender: (element: React.ReactElement) => void) => {
      rerender(
        <>
          <CustomRadios
            options={options}
            inputData={inputData}
            inputKey="selected"
            setInputData={setInputDataFunc}
          />
          <CustomRadios
            options={options}
            inputData={inputData}
            inputKey="another"
            setInputData={setInputDataFunc}
          />
        </>,
      );
    };

    const {rerender} = await renderReact(
      <>
        <CustomRadios
          options={options}
          inputData={inputData}
          inputKey="selected"
          setInputData={setInputDataFunc}
        />
        <CustomRadios
          options={options}
          inputData={inputData}
          inputKey="another"
          setInputData={setInputDataFunc}
        />
      </>,
    );

    const enum1Buttons = screen.getAllByText('check 1');
    expect(enum1Buttons.length).toBe(2);
    const enum2Buttons = screen.getAllByText('check 2');
    expect(enum2Buttons.length).toBe(2);

    fireEvent.click(enum1Buttons[0]);
    invokeRerender(rerender);
    fireEvent.click(enum2Buttons[1]);
    invokeRerender(rerender);

    expect(setInputDataFunc).toHaveBeenCalledTimes(2);
    expect(inputData).toStrictEqual({selected: 1, another: 2});
  });
});
