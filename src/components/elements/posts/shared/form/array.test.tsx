import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {PostMeta, SupportedLanguages} from '../../../../../api-def/api';
import {ArrayDataForm} from './array';

describe('Array data form', () => {
  type Enum = {
    code: string,
  }

  type Payload = PostMeta & {
    enums: Array<Enum>,
  }

  let payload: Payload;
  let getArrayFunc: jest.Mock<Array<Enum>, [Payload]>;
  let setArrayFunc: jest.Mock<void, [Array<Enum>]>;
  let getUpdatedElemFunc: jest.Mock<Enum, [Enum, 'code', string]>;
  let generateNewElemFunc: jest.Mock<Enum, []>;
  let renderEntriesFunc: jest.Mock;

  beforeEach(() => {
    getArrayFunc = jest.fn().mockImplementation((payload) => payload.enums);
    setArrayFunc = jest.fn().mockImplementation((array) => payload.enums = array);
    getUpdatedElemFunc = jest.fn().mockImplementation((element, key, value) => ({...element, [key]: value}));
    generateNewElemFunc = jest.fn().mockImplementation(() => ({code: 7}));
    renderEntriesFunc = jest.fn();
  });

  it('blocks the data removal if < min length', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [
        {
          code: 'enum 1',
        },
        {
          code: 'enum 2',
        },
      ],
    };

    renderReact(() => (
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getByText('', {selector: 'i.bi-x-lg'}).parentElement;
    expect(removeButton).toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2); // Check for disable remove or not & render
    expect(renderEntriesFunc).toHaveBeenCalledTimes(2);
  });

  it('allows the data removal if > min length', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [
        {
          code: 'enum 1',
        },
        {
          code: 'enum 2',
        },
        {
          code: 'enum 3',
        },
      ],
    };

    renderReact(() => (
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getByText('', {selector: 'i.bi-x-lg'});
    expect(removeButton).not.toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2); // Check for disable remove or not & render
    expect(renderEntriesFunc).toHaveBeenCalledTimes(3);
  });

  it('adds data after clicking add', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [
        {
          code: 'enum 1',
        },
        {
          code: 'enum 2',
        },
      ],
    };

    renderReact(() => (
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const addButton = screen.getByText('', {selector: 'i.bi-plus-lg'});
    userEvent.click(addButton);

    expect(payload.enums.length).toBe(3);
    expect(setArrayFunc).toHaveBeenCalledTimes(1);
    expect(generateNewElemFunc).toHaveBeenCalledTimes(1);
  });
});
