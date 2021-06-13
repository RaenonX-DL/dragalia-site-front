import React from 'react';

import {fireEvent, screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api';
import {EnumEntry} from '../../../../api-def/resources';
import {EnumChecksBox} from './enumChecksBox';

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

  const clickFirstButton = () => {
    const enumButton = screen.getByAltText('enum#1');
    fireEvent.click(enumButton);
  };

  const clickSecondButton = () => {
    const enumButton = screen.getByAltText('enum#2');
    fireEvent.click(enumButton);
  };

  let data: {enum: Array<number>};
  let setData: jest.Mock<void, [typeof data]>;

  beforeEach(() => {
    data = {'enum': []};
    setData = jest.fn().mockImplementation((newData) => data = newData);
  });

  it('can check single item', async () => {
    data = {'enum': [] as Array<number>};
    renderReact(() => (
      <EnumChecksBox
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    clickFirstButton();

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: [1]});
  });

  it('can cancel checking single item', async () => {
    const {rerender} = renderReact(() => (
      <EnumChecksBox
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    clickFirstButton();
    rerender();
    clickFirstButton();

    expect(setData).toHaveBeenCalledTimes(2);
    expect(data).toStrictEqual({enum: []});
  });

  it('can check multiple items', async () => {
    const {rerender} = renderReact(() => (
      <EnumChecksBox
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    clickFirstButton();
    rerender();
    clickSecondButton();

    expect(setData).toHaveBeenCalledTimes(2);
    expect(data).toStrictEqual({enum: [1, 2]});
  });

  it('can cancel checking multiple items', async () => {
    const {rerender} = renderReact(() => (
      <EnumChecksBox
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    clickFirstButton();
    rerender();
    clickSecondButton();
    rerender();
    clickFirstButton();

    expect(setData).toHaveBeenCalledTimes(3);
    expect(data).toStrictEqual({enum: [2]});
  });

  it('shows text if the image URL is not available', async () => {
    renderReact(() => (
      <EnumChecksBox
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    expect(screen.getByText('EN 4')).toBeInTheDocument();
  });

  it('shows image if the image URL is available', async () => {
    renderReact(() => (
      <EnumChecksBox
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    expect(screen.getByAltText('enum#3')).toBeInTheDocument();
  });
});
