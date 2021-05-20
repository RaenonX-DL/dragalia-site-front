import React from 'react';

import {ToggleButton} from 'react-bootstrap';

import {render} from '../../../../../test/render/main';
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

    const {app} = await render(
      <RadioChecks
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const enumButton = app.find(ToggleButton).at(1).find('input').first();
    expect(enumButton.exists()).toBeTruthy();
    expect(enumButton.props().checked).toBeTruthy();
    expect(setInputDataFunc).toHaveBeenCalledTimes(0);
  });

  test('selecting another option changes the state', async () => {
    inputData = {selected: 2};

    const {app} = await render(
      <RadioChecks
        options={options}
        inputData={inputData}
        inputKey="selected"
        setInputData={setInputDataFunc}
      />,
    );

    const enumButton = app.find(ToggleButton).at(0).find('input').first();
    expect(enumButton.exists()).toBeTruthy();
    enumButton.simulate('change', {target: {checked: true}});

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({selected: 1});
  });
});
