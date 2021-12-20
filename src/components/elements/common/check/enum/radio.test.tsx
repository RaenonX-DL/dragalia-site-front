import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api';
import {EnumEntry} from '../../../../../api-def/resources';
import {EnumRadioGroup} from './radio';


describe('Enum checks as radio', () => {
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

  let data: {selected: number};
  let setData: jest.Mock<void, [typeof data]>;

  beforeEach(() => {
    setData = jest.fn().mockImplementation((newData) => data = newData);
  });

  it('can check single item', async () => {
    data = {selected: 2};
    const {rerender} = renderReact(() => (
      <EnumRadioGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        groupName="radio"
      />
    ));

    clickFirstButton(rerender);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({selected: 1});
  });

  it('does not change the selection if selected the same', async () => {
    data = {selected: 1};
    const {rerender} = renderReact(() => (
      <EnumRadioGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        groupName="radio"
      />
    ));

    clickFirstButton(rerender);

    expect(setData).toHaveBeenCalledTimes(0);
    expect(data).toStrictEqual({selected: 1});
  });

  it('shows text if the image URL is not available', async () => {
    data = {selected: 2};
    renderReact(() => (
      <EnumRadioGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        groupName="radio"
      />
    ));

    expect(screen.getByText('EN 4')).toBeInTheDocument();
  });

  it('shows image if the image URL is available', async () => {
    data = {selected: 2};
    renderReact(() => (
      <EnumRadioGroup
        options={enums}
        inputData={data}
        setInputData={setData}
        getValue={(data) => data.selected}
        getUpdatedInputData={(newValue) => ({selected: newValue})}
        groupName="radio"
      />
    ));

    expect(screen.getByAltText('EN 3')).toBeInTheDocument();
  });
});
