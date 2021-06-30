import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api';
import {EnumEntry} from '../../../../../api-def/resources';
import {EnumCheckboxGroup} from './checkbox';


describe('Enum check boxes as checkboxes', () => {
  const enums: Array<EnumEntry> = [
    {
      name: '#1',
      code: 1,
      imagePath: '/1.jpg',
      trans: {
        [SupportedLanguages.CHT]: 'CHT 1',
        [SupportedLanguages.EN]: 'EN 1',
        [SupportedLanguages.JP]: 'JP 1',
      },
    },
    {
      name: '#2',
      code: 2,
      imagePath: '/2.jpg',
      trans: {
        [SupportedLanguages.CHT]: 'CHT 2',
        [SupportedLanguages.EN]: 'EN 2',
        [SupportedLanguages.JP]: 'JP 2',
      },
    },
    {
      name: '#3',
      code: 3,
      imagePath: '/3.jpg',
      trans: {
        [SupportedLanguages.CHT]: 'CHT 3',
        [SupportedLanguages.EN]: 'EN 3',
        [SupportedLanguages.JP]: 'JP 3',
      },
    },
    {
      name: '#4',
      code: 4,
      imagePath: null,
      trans: {
        [SupportedLanguages.CHT]: 'CHT 4',
        [SupportedLanguages.EN]: 'EN 4',
        [SupportedLanguages.JP]: 'JP 4',
      },
    },
  ];

  const clickFirstButton = (rerender: () => void) => {
    const enumButton = screen.getByAltText('EN 1');
    userEvent.click(enumButton);
    rerender();
  };

  const clickSecondButton = (rerender: () => void) => {
    const enumButton = screen.getByAltText('EN 2');
    userEvent.click(enumButton);
    rerender();
  };

  let data: {selected: Array<number>};
  let setData: jest.Mock;

  beforeEach(() => {
    setData = jest.fn().mockImplementation((newData) => data = newData);
  });

  it('can check single item', async () => {
    data = {selected: []};
    const {rerender} = renderReact(() => (
      <EnumCheckboxGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    clickFirstButton(rerender);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({selected: [1]});
  });

  it('can cancel checking single item', async () => {
    data = {selected: []};
    const {rerender} = renderReact(() => (
      <EnumCheckboxGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    clickFirstButton(rerender);
    clickFirstButton(rerender);

    expect(setData).toHaveBeenCalledTimes(2);
    expect(data).toStrictEqual({selected: []});
  });

  it('can check multiple items', async () => {
    data = {selected: []};
    const {rerender} = renderReact(() => (
      <EnumCheckboxGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    clickFirstButton(rerender);
    clickSecondButton(rerender);

    expect(setData).toHaveBeenCalledTimes(2);
    expect(data).toStrictEqual({selected: [1, 2]});
  });

  it('can cancel checking multiple items', async () => {
    data = {selected: []};
    const {rerender} = renderReact(() => (
      <EnumCheckboxGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    clickFirstButton(rerender);
    clickSecondButton(rerender);
    clickFirstButton(rerender);

    expect(setData).toHaveBeenCalledTimes(3);
    expect(data).toStrictEqual({selected: [2]});
  });

  it('shows text if the image URL is not available', async () => {
    data = {selected: []};
    renderReact(() => (
      <EnumCheckboxGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    expect(screen.getByText('EN 4')).toBeInTheDocument();
  });

  it('shows image if the image URL is available', async () => {
    data = {selected: []};
    renderReact(() => (
      <EnumCheckboxGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
      />
    ));

    expect(screen.getByAltText('EN 3')).toBeInTheDocument();
  });
});
