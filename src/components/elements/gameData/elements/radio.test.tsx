import React from 'react';

import {fireEvent, screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {RadioCheckLabel, RadioChecks} from './radio';

describe('Radio checks', () => {
  const options: Array<RadioCheckLabel> = [
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
      <RadioChecks
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
      <RadioChecks
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
});
