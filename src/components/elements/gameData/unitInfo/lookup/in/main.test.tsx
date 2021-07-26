import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {ElementEnums, WeaponTypeEnums} from '../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../../utils/services/resources/loader';
import {UnitInfoLookupInput} from './main';
import {InputData} from './types';
import {generateInputData, overrideInputData} from './utils';


describe('Input of analysis lookup', () => {
  const elemEnums = {
    elemental: [
      {
        name: 'elem A',
        code: 1,
        imagePath: null,
        trans: {
          [SupportedLanguages.CHT]: 'elem A CHT',
          [SupportedLanguages.EN]: 'elem A EN',
          [SupportedLanguages.JP]: 'elem A JP',
        },
      },
      {
        name: 'elem B',
        code: 2,
        imagePath: null,
        trans: {
          [SupportedLanguages.CHT]: 'elem B CHT',
          [SupportedLanguages.EN]: 'elem B EN',
          [SupportedLanguages.JP]: 'elem B JP',
        },
      },
    ],
  };
  const weaponEnums = {
    weapon: [
      {
        name: 'weapon A',
        code: 1,
        imagePath: null,
        trans: {
          [SupportedLanguages.CHT]: 'weapon A CHT',
          [SupportedLanguages.EN]: 'weapon A EN',
          [SupportedLanguages.JP]: 'weapon A JP',
        },
      },
      {
        name: 'weapon B',
        code: 2,
        imagePath: null,
        trans: {
          [SupportedLanguages.CHT]: 'weapon B CHT',
          [SupportedLanguages.EN]: 'weapon B EN',
          [SupportedLanguages.JP]: 'weapon B JP',
        },
      },
    ],
  };

  let onSearchRequested: jest.Mock<() => void, [InputData]>;
  let getEnumElements: jest.SpyInstance<Promise<ElementEnums>,
    [callback?: (elementEnums: ElementEnums) => void]>;
  let getEnumWeaponType: jest.SpyInstance<Promise<WeaponTypeEnums>,
    [callback?: (weaponTypeEnums: WeaponTypeEnums) => void]>;

  const clickSearchButton = () => {
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);
  };

  beforeEach(() => {
    onSearchRequested = jest.fn().mockImplementation(() => jest.fn());
    getEnumElements = jest
      .spyOn(ResourceLoader, 'getEnumElements')
      .mockImplementation(async (callback) => {
        if (callback) {
          callback(elemEnums);
        }
        return elemEnums;
      });
    getEnumWeaponType = jest
      .spyOn(ResourceLoader, 'getEnumWeaponTypes')
      .mockImplementation(async (callback) => {
        if (callback) {
          callback(weaponEnums);
        }
        return weaponEnums;
      });
  });

  it('fetches required enums on load', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);
    expect(getEnumWeaponType).toHaveBeenCalledTimes(1);
  });

  it('passes empty input data if no condition specified', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    const expectedInput: InputData = generateInputData();

    clickSearchButton();

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with analysis type', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const characterButton = await screen.findByText(translationEN.posts.analysis.type.character);
    userEvent.click(characterButton);

    clickSearchButton();

    const expectedInput: InputData = overrideInputData(generateInputData(), {types: [UnitType.CHARACTER]});

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with elements', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const elemButton = await screen.findByText('elem A EN');
    userEvent.click(elemButton);

    clickSearchButton();

    const expectedInput: InputData = overrideInputData(generateInputData(), {elements: [1]});

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with weapon types', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const weaponButton = await screen.findByText('weapon B EN');
    userEvent.click(weaponButton);

    clickSearchButton();

    const expectedInput: InputData = overrideInputData(generateInputData(), {weaponTypes: [2]});

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with search keyword', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const searchInput = await screen.findByPlaceholderText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput, 'test');

    clickSearchButton();

    const expectedInput: InputData = overrideInputData(generateInputData(), {keyword: 'test'});

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with sort order', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const sorter = await screen.findByText(/Sort by/);
    userEvent.click(sorter);
    const sortByViewCount = await screen.findByText(/View Count/);
    userEvent.click(sortByViewCount);

    clickSearchButton();

    const expectedInput: InputData = overrideInputData(generateInputData(), {sortBy: 'viewCount'});

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with multiple conditions', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const characterButton = await screen.findByText(translationEN.posts.analysis.type.character);
    userEvent.click(characterButton);
    const elemButton = await screen.findByText('elem A EN');
    userEvent.click(elemButton);
    const weaponButton = await screen.findByText('weapon B EN');
    userEvent.click(weaponButton);
    const searchInput = await screen.findByPlaceholderText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput, 'test');

    clickSearchButton();

    const expectedInput: InputData = overrideInputData(
      generateInputData(),
      {
        keyword: 'test',
        types: [UnitType.CHARACTER],
        elements: [1],
        weaponTypes: [2],
      },
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('triggers search on entering `enter`', async () => {
    renderReact(() => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const searchInput = await screen.findByPlaceholderText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput, 'test');
    userEvent.type(searchInput, '{enter}');

    const expectedInput: InputData = overrideInputData(generateInputData(), {keyword: 'test'});

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('shows post manage bar if the user is an admin', async () => {
    renderReact(
      () => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>),
      {user: {isAdmin: true}},
    );

    screen.getByText(translationEN.posts.manage.addChara);
  });
});
