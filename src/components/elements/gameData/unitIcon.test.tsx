import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {UnitType} from '../../../api-def/api/other/unit';
import {UnitInfoData} from '../../../api-def/resources/types/unitInfo';
import * as utils from '../posts/analysis/lookup/utils';
import {UnitIcon} from './unitIcon';


describe('Unit info icon', () => {
  let getImageUrlFunc: jest.SpyInstance;

  beforeEach(() => {
    getImageUrlFunc = jest.spyOn(utils, 'getImageURL');
  });

  it('gets unit image URL', async () => {
    const name = {
      [SupportedLanguages.CHT]: 'name CHT',
      [SupportedLanguages.EN]: 'name EN',
      [SupportedLanguages.JP]: 'name JP',
    };

    const unitInfo: UnitInfoData = {
      type: UnitType.CHARACTER,
      cvEn: name,
      name: name,
      cvJp: name,
      element: 1,
      iconName: 'icon',
      id: 1001,
      rarity: 5,
      releaseEpoch: 0,
    };

    await renderReact(<UnitIcon unitInfo={unitInfo}/>);

    screen.getByAltText(name[SupportedLanguages.EN]); // This fails if the image does not exist on screen
    expect(getImageUrlFunc).toHaveBeenCalledTimes(1);
    expect(getImageUrlFunc).toHaveBeenCalledWith(unitInfo);
  });
});
