import React from 'react';

import {fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {
  AnalysisLookupEntry,
  AnalysisLookupLandingResponse,
  ApiResponseCode,
  SupportedLanguages,
  UnitType,
} from '../../../../../../api-def/api';
import {ElementEnums, WeaponTypeEnums} from '../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
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
  const landingAnalysisEntries: Array<AnalysisLookupEntry> = [
    {
      type: UnitType.CHARACTER,
      unitId: 10950101,
      lang: SupportedLanguages.CHT,
      viewCount: 107,
      modifiedEpoch: 5000000,
      publishedEpoch: 900000,
    },
    {
      type: UnitType.CHARACTER,
      unitId: 10950102,
      lang: SupportedLanguages.CHT,
      viewCount: 207,
      modifiedEpoch: 5000000,
      publishedEpoch: 900000,
    },
    {
      type: UnitType.CHARACTER,
      unitId: 10850103,
      lang: SupportedLanguages.CHT,
      viewCount: 307,
      modifiedEpoch: 5000000,
      publishedEpoch: 900000,
    },
  ];

  let onSearchRequested: jest.Mock<() => void, [InputData]>;
  let getEnumElements: jest.SpyInstance<Promise<ElementEnums>,
    [callback?: (elementEnums: ElementEnums) => void]>;
  let getEnumWeaponType: jest.SpyInstance<Promise<WeaponTypeEnums>,
    [callback?: (weaponTypeEnums: WeaponTypeEnums) => void]>;
  let fetchLandingInfo: jest.SpyInstance<Promise<AnalysisLookupLandingResponse>,
    [string, SupportedLanguages]>;

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
    fetchLandingInfo = jest
      .spyOn(ApiRequestSender, 'analysisLookupLanding')
      .mockImplementation(async () => ({
        code: ApiResponseCode.SUCCESS,
        success: true,
        isAdmin: true,
        analyses: landingAnalysisEntries,
      }));
  });

  it('fetches required enums on load', async () => {
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

    expect(getEnumElements).toHaveBeenCalledTimes(1);
    expect(getEnumWeaponType).toHaveBeenCalledTimes(1);
  });

  it('fetches landing info on load', async () => {
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

    expect(fetchLandingInfo).toHaveBeenCalledTimes(1);
  });

  it('passes empty input data if no condition specified', async () => {
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

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
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

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
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

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
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

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
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

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
    await renderReact(<AnalysisLookupInput onSearchRequested={onSearchRequested}/>);

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
});
