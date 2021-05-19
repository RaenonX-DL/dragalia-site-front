import React from 'react';

import {ReactWrapper} from 'enzyme';
import {ToggleButton} from 'react-bootstrap';

import {render} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api/other/lang';
import {EnumEntry} from '../../../../utils/services/resources/types/enums';
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
  ];


  const CheckWrapper = ({data}: {data: {enum: Array<number>}}) => {
    return (
      <EnumChecksBox
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
    enumButton.simulate('change', {target: {checked: !data.enum.includes(1)}});
  };

  let data: {enum: Array<number>};
  let setData: jest.Mock<void, [typeof data]>;

  beforeEach(() => {
    data = {'enum': []};
    setData = jest.fn().mockImplementation((newData) => data = newData);
  });

  afterEach(() => {
    data = {'enum': []};
  });

  it('can check single item', async () => {
    data = {'enum': [] as Array<number>};
    const {app} = await render(<CheckWrapper data={data}/>);

    clickFirstButton(app);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: [1]});
  });

  it('can cancel checking single item', async () => {
    data = {'enum': [1]};
    const {app} = await render(<CheckWrapper data={data}/>);

    clickFirstButton(app);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: []});
  });

  it('can check multiple items', async () => {
    data = {'enum': [2]};
    const {app} = await render(<CheckWrapper data={data}/>);

    clickFirstButton(app);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: [2, 1]});
  });

  it('can cancel multiple items', async () => {
    data = {'enum': [1, 2, 3]};
    const {app} = await render(<CheckWrapper data={data}/>);

    clickFirstButton(app);

    expect(setData).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({enum: [2, 3]});
  });
});
