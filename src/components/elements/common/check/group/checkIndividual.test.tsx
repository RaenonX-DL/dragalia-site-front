import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {overrideObject} from '../../../../../utils/override';
import {IndividualCheckGroup} from './checkIndividual';


describe('Individual checks', () => {
  type Input = {a: boolean, b: boolean};

  let inputData: Input;

  let setInputDataFunc: jest.Mock;

  beforeEach(() => {
    setInputDataFunc = jest.fn().mockImplementation((newData) => inputData = newData);
  });

  it('preloads the selection', async () => {
    inputData = {a: true, b: false};

    renderReact(() => (
      <IndividualCheckGroup
        checkboxes={[
          {
            text: 'A',
            getValue: (inputData) => inputData.a,
            getUpdatedInputData: (a) => overrideObject(inputData, {a}),
          },
          {
            text: 'B',
            getValue: (inputData) => inputData.b,
            getUpdatedInputData: (b) => overrideObject(inputData, {b}),
          },
        ]}
        inputData={inputData}
        setInputData={setInputDataFunc}
      />
    ));

    const toggleInput = screen.getByText('A').parentNode?.previousSibling;
    expect(toggleInput).toHaveAttribute('checked');
    expect(setInputDataFunc).toHaveBeenCalledTimes(0);
  });

  it('deselect an option', async () => {
    inputData = {a: true, b: false};

    renderReact(() => (
      <IndividualCheckGroup
        checkboxes={[
          {
            text: 'A',
            getValue: (inputData) => inputData.a,
            getUpdatedInputData: (a) => overrideObject(inputData, {a}),
          },
          {
            text: 'B',
            getValue: (inputData) => inputData.b,
            getUpdatedInputData: (b) => overrideObject(inputData, {b}),
          },
        ]}
        inputData={inputData}
        setInputData={setInputDataFunc}
      />
    ));

    const enumButton = screen.getByText('A');
    userEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({a: false, b: false});
  });

  it('can select multiple options', async () => {
    inputData = {a: true, b: false};

    const {rerender} = renderReact(() => (
      <IndividualCheckGroup
        checkboxes={[
          {
            text: 'A',
            getValue: (inputData) => inputData.a,
            getUpdatedInputData: (a) => overrideObject(inputData, {a}),
          },
          {
            text: 'B',
            getValue: (inputData) => inputData.b,
            getUpdatedInputData: (b) => overrideObject(inputData, {b}),
          },
        ]}
        inputData={inputData}
        setInputData={setInputDataFunc}
      />
    ));

    const enum1Button = screen.getByText('A');
    userEvent.click(enum1Button);
    rerender();
    const enum2Button = screen.getByText('B');
    userEvent.click(enum2Button);

    expect(setInputDataFunc).toHaveBeenCalledTimes(2);
    expect(inputData).toStrictEqual({a: false, b: true});
  });

  test('selecting an option adds it to the state', async () => {
    inputData = {a: true, b: false};

    renderReact(() => (
      <IndividualCheckGroup
        checkboxes={[
          {
            text: 'A',
            getValue: (inputData) => inputData.a,
            getUpdatedInputData: (a) => overrideObject(inputData, {a}),
          },
          {
            text: 'B',
            getValue: (inputData) => inputData.b,
            getUpdatedInputData: (b) => overrideObject(inputData, {b}),
          },
        ]}
        inputData={inputData}
        setInputData={setInputDataFunc}
      />
    ));

    const enumButton = screen.getByText('B');
    userEvent.click(enumButton);

    expect(setInputDataFunc).toHaveBeenCalledTimes(1);
    expect(inputData).toStrictEqual({a: true, b: true});
  });
});
