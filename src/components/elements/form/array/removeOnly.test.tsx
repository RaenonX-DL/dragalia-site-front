import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {PostMeta, SupportedLanguages} from '../../../../api-def/api';
import {ArrayFormRemoveOnly} from './removeOnly';


describe('Array form (remove only)', () => {
  type Enum = {
    code: string,
  }

  type Payload = PostMeta & {
    enums: Array<Enum>,
  }

  let payload: Payload;
  let getArrayFunc: jest.Mock<Array<Enum>, [Payload]>;
  let setArrayFunc: jest.Mock<void, [Array<Enum>]>;
  let renderEntriesFunc: jest.Mock;

  beforeEach(() => {
    getArrayFunc = jest.fn().mockImplementation((payload) => payload.enums);
    setArrayFunc = jest.fn().mockImplementation((array) => payload.enums = array);
    renderEntriesFunc = jest.fn();
  });

  it('blocks removal if element # < min length', async () => {
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
      <ArrayFormRemoveOnly
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[0].parentElement;
    expect(removeButton).toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2);
    expect(renderEntriesFunc).toHaveBeenCalledTimes(2);
  });

  it('allows removal if element # > min length', async () => {
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
      <ArrayFormRemoveOnly
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[2];
    expect(removeButton).not.toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2);
    expect(renderEntriesFunc).toHaveBeenCalledTimes(3);
  });

  it('removes data at a specific index', async () => {
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
      <ArrayFormRemoveOnly
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[1];
    expect(removeButton).not.toBeDisabled();
    userEvent.click(removeButton);

    expect(setArrayFunc).toHaveBeenCalledTimes(1);
    expect(setArrayFunc.mock.calls[0][0].length).toBe(2);
    expect(setArrayFunc.mock.calls[0][0].map((item) => item.code)).toStrictEqual(['enum 1', 'enum 3']);
  });

  it('removes the first data', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [
        {code: 'enum 1'},
        {code: 'enum 2'},
        {code: 'enum 3'},
      ],
    };

    renderReact(() => (
      <ArrayFormRemoveOnly
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[0];
    expect(removeButton).not.toBeDisabled();
    userEvent.click(removeButton);

    expect(setArrayFunc).toHaveBeenCalledTimes(1);
    expect(setArrayFunc.mock.calls[0][0].length).toBe(2);
    expect(setArrayFunc.mock.calls[0][0].map((item) => item.code)).toStrictEqual(['enum 2', 'enum 3']);
  });
});
