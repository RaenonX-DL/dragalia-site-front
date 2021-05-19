import React from 'react';

import {ReactWrapper} from 'enzyme';
import {ToggleButton} from 'react-bootstrap';

import {render} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api/other/lang';
import {EnumEntry} from '../../../../utils/services/resources/types/enums';
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

  const clickFirstButton = (app: ReactWrapper) => {
    const enumButton = app.find(ToggleButton).at(0).find('input').first();
    expect(enumButton.exists()).toBeTruthy();
    enumButton.simulate('change', {target: {checked: !(data.enum === 1)}});
  };

  let data: {enum: number};
  let setData: jest.Mock<void, [typeof data]>;

  beforeEach(() => {
    data = {'enum': 2};
    setData = jest.fn().mockImplementation((newData) => data = newData);
  });

  afterEach(() => {
    data = {'enum': 2};
  });

  it('can check single item', async () => {
    data = {'enum': 2};
    const {app} = await render(<CheckWrapper data={data}/>);

    clickFirstButton(app);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: 1});
  });

  it('does not change the selection if selected the same', async () => {
    data = {'enum': 1};
    const {app} = await render(<CheckWrapper data={data}/>);

    clickFirstButton(app);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: 1});
  });
});
