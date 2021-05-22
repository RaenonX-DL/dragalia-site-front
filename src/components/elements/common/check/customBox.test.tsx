import React from 'react';

import {fireEvent, screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {CustomBoxes} from './customBox';
import {CheckEntry} from './types';

describe('Checkboxes', () => {
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

  let inputData: {selected: Array<number>};

  let setInputDataFunc: jest.Mock<void, [{selected: Array<number>}]>;

  beforeEach(() => {
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('preloads the selection', async () => {
    inputData = {selected: [2, 3]};

    await renderReact(
      <CustomBoxes
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

  it('deselect an option', async () => {
    inputData = {selected: [2]};

    await renderReact(
      <CustomBoxes
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const enumButton = screen.getByText('check 2');
    fireEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: []});
  });

  it('can select multiple options', async () => {
    inputData = {selected: []};

    const {rerender} = await renderReact(
      <CustomBoxes
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const enum1Button = screen.getByText('check 1');
    fireEvent.click(enum1Button);
    rerender(
      <CustomBoxes
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );
    const enum2Button = screen.getByText('check 2');
    fireEvent.click(enum2Button);

    expect(setInputDataFunc).toHaveBeenCalledTimes(2);
    expect(inputData).toStrictEqual({selected: [1, 2]});
  });

  test('selecting an option add it to the state', async () => {
    inputData = {selected: [2]};

    await renderReact(
      <CustomBoxes
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const enumButton = screen.getByText('check 1');
    fireEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: [2, 1]});
  });
});
