import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {
  SupportedLanguages,
  UnitType,
} from '../../../../../../api-def/api';
import {ElementEnums, WeaponTypeEnums} from '../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../../utils/services/resources/loader';
import {AnalysisLookupInput} from './main';
import {InputData} from './types';

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
    fireEvent.click(searchButton);
  };

  beforeEach(() => {
    onSearchRequested = jest.fn();
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
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    expect(getEnumElements).toHaveBeenCalledTimes(1);
    expect(getEnumWeaponType).toHaveBeenCalledTimes(1);
  });

  it('passes empty input data if no condition specified', async () => {
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    const expectedInput: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    clickSearchButton();

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with analysis type', async () => {
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    await waitFor(() => expect(getEnumElements).toHaveBeenCalledTimes(1));

    const characterButton = await screen.findByText(translationEN.posts.analysis.type.character);
    fireEvent.click(characterButton);

    clickSearchButton();

    const expectedInput: InputData = {
      keyword: '',
      types: [UnitType.CHARACTER],
      elements: [],
      weaponTypes: [],
    };

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with elements', async () => {
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    await waitFor(() => expect(getEnumElements).toHaveBeenCalledTimes(1));

    const elemButton = await screen.findByText('elem A EN');
    fireEvent.click(elemButton);

    clickSearchButton();

    const expectedInput: InputData = {
      keyword: '',
      types: [],
      elements: [1],
      weaponTypes: [],
    };

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with weapon types', async () => {
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    await waitFor(() => expect(getEnumElements).toHaveBeenCalledTimes(1));

    const weaponButton = await screen.findByText('weapon B EN');
    fireEvent.click(weaponButton);

    clickSearchButton();

    const expectedInput: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [2],
    };

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with search keyword', async () => {
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    await waitFor(() => expect(getEnumElements).toHaveBeenCalledTimes(1));

    const searchInput = await screen.findByPlaceholderText(translationEN.misc.searchKeyword);
    fireEvent.change(searchInput, {target: {value: 'test'}});

    clickSearchButton();

    const expectedInput: InputData = {
      keyword: 'test',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with multiple conditions', async () => {
    await act(async () => {
      renderReact(() => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>));
    });

    await waitFor(() => expect(getEnumElements).toHaveBeenCalledTimes(1));

    const characterButton = await screen.findByText(translationEN.posts.analysis.type.character);
    fireEvent.click(characterButton);
    const elemButton = await screen.findByText('elem A EN');
    fireEvent.click(elemButton);
    const weaponButton = await screen.findByText('weapon B EN');
    fireEvent.click(weaponButton);
    const searchInput = await screen.findByPlaceholderText(translationEN.misc.searchKeyword);
    fireEvent.change(searchInput, {target: {value: 'test'}});

    clickSearchButton();

    const expectedInput: InputData = {
      keyword: 'test',
      types: [UnitType.CHARACTER],
      elements: [1],
      weaponTypes: [2],
    };

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('shows post manage bar if the user is an admin', async () => {
    await act(async () => {
      renderReact(
        () => (<AnalysisLookupInput onSearchRequested={onSearchRequested}/>),
        {user: {isAdmin: true}},
      );
    });

    screen.getByText(translationEN.posts.manage.addChara);
  });
});
