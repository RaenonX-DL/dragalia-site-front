import React from 'react';

import {Button} from 'react-bootstrap';

import {renderMount} from '../../../../../../test/render/main';
import {PostMetaPayload, SupportedLanguages} from '../../../../../api-def/api';
import {ArrayDataForm} from './array';
import {ArrayControl} from './arrayControl';

describe('Array data form', () => {
  type Enum = {
    code: string,
  }

  type Payload = PostMetaPayload & {
    enums: Array<Enum>,
  }

  let payload: Payload;
  let getArrayFunc: jest.Mock<Array<Enum>, [Payload]>;
  let setArrayFunc: jest.Mock<void, [Array<Enum>]>;
  let updateElemValueFunc: jest.Mock<void, [Enum, 'code', string]>;
  let generateNewElemFunc: jest.Mock<Enum, []>;
  let renderEntriesFunc: jest.Mock;

  beforeEach(() => {
    getArrayFunc = jest.fn().mockImplementation((payload) => payload.enums);
    setArrayFunc = jest.fn().mockImplementation((array) => payload.enums = array);
    updateElemValueFunc = jest.fn().mockImplementation((elem, key, value) => elem[key] = value);
    generateNewElemFunc = jest.fn().mockImplementation(() => ({code: 7}));
    renderEntriesFunc = jest.fn();
  });

  it('blocks the data removal if < min length', async () => {
    payload = {
      googleUid: 'uid',
      lang: SupportedLanguages.CHT,
      title: 'title',
      enums: [
        {
          code: 'enum 1',
        },
        {
          code: 'enum 2',
        },
      ],
    };

    const {app} = await renderMount(
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        updateElementValue={updateElemValueFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />,
    );

    expect(app.find(ArrayControl).find(Button).at(0).props().disabled).toBe(true);
    expect(getArrayFunc).toHaveBeenCalledTimes(2); // Check for disable remove or not & render
    expect(renderEntriesFunc).toHaveBeenCalledTimes(2);
  });

  it('blocks the data removal if > min length', async () => {
    payload = {
      googleUid: 'uid',
      lang: SupportedLanguages.CHT,
      title: 'title',
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

    const {app} = await renderMount(
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        updateElementValue={updateElemValueFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />,
    );

    expect(app.find(ArrayControl).find(Button).at(0).props().disabled).toBe(false);
    expect(getArrayFunc).toHaveBeenCalledTimes(2); // Check for disable remove or not & render
    expect(renderEntriesFunc).toHaveBeenCalledTimes(3);
  });

  it('adds data after clicking add', async () => {
    payload = {
      googleUid: 'uid',
      lang: SupportedLanguages.CHT,
      title: 'title',
      enums: [
        {
          code: 'enum 1',
        },
        {
          code: 'enum 2',
        },
      ],
    };

    const {app} = await renderMount(
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={getArrayFunc}
        setArray={setArrayFunc}
        updateElementValue={updateElemValueFunc}
        generateNewElement={generateNewElemFunc}
        renderEntries={renderEntriesFunc}
      />,
    );

    const addButton = app.find(ArrayControl).find(Button).at(1).find('button').first();
    expect(addButton.exists()).toBeTruthy();
    addButton.simulate('click');

    expect(payload.enums.length).toBe(3);
    expect(setArrayFunc).toHaveBeenCalledTimes(1);
    expect(generateNewElemFunc).toHaveBeenCalledTimes(1);
  });
});
