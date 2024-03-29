import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {PostMeta, SupportedLanguages} from '../../../../api-def/api';
import {ArrayForm} from './main';


describe('Array form', () => {
  type Enum = {
    code: string,
  };

  type Payload = PostMeta & {
    enums: Array<Enum>,
  };

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

  it('blocks removal if element # < min length', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
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
      enums: [{code: 'enum 1'}, {code: 'enum 2'}, {code: 'enum 3'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[2];
    expect(removeButton).not.toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2);
    expect(renderEntriesFunc).toHaveBeenCalledTimes(3);
  });

  it('adds data after clicking add', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}],
    };

    renderReact(() => (
      <ArrayForm
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

  it('removes data at a specific index', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}, {code: 'enum 3'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
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
      enums: [{code: 'enum 1'}, {code: 'enum 2'}, {code: 'enum 3'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
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

  it('adds new data to the top if specified', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
        addToTop
      />
    ));

    const addButton = screen.getByText('', {selector: 'i.bi-plus-lg'});
    userEvent.click(addButton);

    expect(payload.enums.map((element) => element.code)).toStrictEqual([7, 'enum 1', 'enum 2']);
    expect(setArrayFunc).toHaveBeenCalledTimes(1);
    expect(generateNewElemFunc).toHaveBeenCalledTimes(1);
  });

  it('removes added entry starting from an empty array', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={0}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const addButton = screen.getByText('', {selector: 'i.bi-plus-lg'});
    userEvent.click(addButton);

    const removeButton = screen.getByText('', {selector: 'i.bi-x-lg'});
    userEvent.click(removeButton);

    expect(payload.enums.length).toBe(0);
    expect(screen.queryByText('', {selector: 'i.bi-x-lg'})).not.toBeInTheDocument();
  });

  it('removes added entry starting from 1-element array in `addToTop`', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'a'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={0}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
        addToTop
      />
    ));

    const addButton = screen.getByText('', {selector: 'i.bi-plus-lg'});
    userEvent.click(addButton);
    userEvent.click(addButton);

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[1];
    userEvent.click(removeButton);

    expect(payload.enums.map((entry) => entry.code)).toStrictEqual([7, 'a']);
  });

  it('blocks move-up button of the top entry', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const moveUpButtons = screen.getAllByText('', {selector: 'i.bi-caret-up-fill'});

    const moveUpButton1 = moveUpButtons[0].parentElement;
    const moveUpButton2 = moveUpButtons[1].parentElement;

    expect(moveUpButton1).toBeDisabled();
    expect(moveUpButton2).not.toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2);
    expect(renderEntriesFunc).toHaveBeenCalledTimes(2);
  });

  it('blocks move-down button of the bottom entry', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const moveDownButtons = screen.getAllByText('', {selector: 'i.bi-caret-down-fill'});

    const moveDownButton1 = moveDownButtons[0].parentElement;
    const moveDownButton2 = moveDownButtons[1].parentElement;

    expect(moveDownButton1).not.toBeDisabled();
    expect(moveDownButton2).toBeDisabled();
    expect(getArrayFunc).toHaveBeenCalledTimes(2);
    expect(renderEntriesFunc).toHaveBeenCalledTimes(2);
  });

  it('moves up an entry', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}, {code: 'enum 3'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const moveUpButton = screen.getAllByText('', {selector: 'i.bi-caret-up-fill'})[1];
    userEvent.click(moveUpButton);

    expect(payload.enums.map((entry) => entry.code)).toStrictEqual(['enum 2', 'enum 1', 'enum 3']);
  });

  it('moves down an entry', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}, {code: 'enum 3'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />
    ));

    const moveUpButton = screen.getAllByText('', {selector: 'i.bi-caret-down-fill'})[1];
    userEvent.click(moveUpButton);

    expect(payload.enums.map((entry) => entry.code)).toStrictEqual(['enum 1', 'enum 3', 'enum 2']);
  });

  it('disallows entry moving if specified', async () => {
    payload = {
      lang: SupportedLanguages.CHT,
      enums: [{code: 'enum 1'}, {code: 'enum 2'}, {code: 'enum 3'}],
    };

    renderReact(() => (
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        getUpdatedElement={getUpdatedElemFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
        showMoveButton={false}
      />
    ));

    expect(screen.queryByText('', {selector: 'i.bi-caret-down-fill'})).not.toBeInTheDocument();
  });
});
