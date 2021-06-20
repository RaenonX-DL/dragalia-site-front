import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api';
import {EnumEntry} from '../../../../api-def/resources/types';
import {EnumChecksRadio} from './enumChecksRadio';

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

  const CheckWrapper = ({data}: {data: {enum: number}}) => {
    return (
      <EnumChecksRadio
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    );
  };

  const clickFirstButton = () => {
    const enumButton = screen.getByAltText('enum#1');
    userEvent.click(enumButton);
  };

  let data: {enum: number};
  let setData: jest.Mock<void, [typeof data]>;

  beforeEach(() => {
    data = {'enum': 2};
    setData = jest.fn().mockImplementation((newData) => data = newData);
  });

  it('can check single item', async () => {
    data = {'enum': 2};
    renderReact(() => <CheckWrapper data={data}/>);

    clickFirstButton();

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: 1});
  });

  it('does not change the selection if selected the same', async () => {
    data = {'enum': 1};
    const {rerender} = renderReact(() => <CheckWrapper data={data}/>);

    clickFirstButton();
    rerender();

    expect(setData).toHaveBeenCalledTimes(0);
    expect(data).toStrictEqual({enum: 1});
  });

  it('shows text if the image URL is not available', async () => {
    renderReact(() => (
      <EnumChecksRadio
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
      <EnumChecksRadio
        options={enums}
        inputData={data}
        inputKey="enum"
        setInputData={setData}
      />
    ));

    expect(screen.getByAltText('enum#3')).toBeInTheDocument();
  });
});
