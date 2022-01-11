import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {UnitType, SupportedLanguages} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {overrideObject} from '../../../../../utils/override';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {UnitFilter} from './main';
import {UnitFilterInputData} from './types';
import {generateFilterInput} from './utils';


describe('Unit filter input', () => {
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

  let onSearchRequested: jest.Mock;
  let getEnumElements: jest.SpyInstance;
  let getEnumWeaponType: jest.SpyInstance;

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
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);
    expect(getEnumWeaponType).toHaveBeenCalledTimes(1);
  });

  it('passes empty input data if no condition specified', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    const expectedInput: UnitFilterInputData<'unitId'> = generateFilterInput('unitId');

    clickSearchButton();

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with analysis type', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const characterButton = await screen.findByText(translationEN.enum.unitType[UnitType.CHARACTER]);
    userEvent.click(characterButton);

    clickSearchButton();

    const expectedInput: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {type: UnitType.CHARACTER},
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with elements', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const elemButton = await screen.findByText('elem A EN');
    userEvent.click(elemButton);

    clickSearchButton();

    const expectedInput: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {elements: [1]},
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with weapon types', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const weaponButton = await screen.findByText('weapon B EN');
    userEvent.click(weaponButton);

    clickSearchButton();

    const expectedInput: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {weaponTypes: [2]},
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with search keyword', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const searchInput = await screen.findByText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput.previousSibling as Element, 'test');

    clickSearchButton();

    const expectedInput: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {keyword: 'test'},
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with sort order', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID', viewCount: () => 'View Count'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const sorter = await screen.findByText(/Sort by/);
    userEvent.click(sorter);
    const sortByViewCount = await screen.findByText(/View Count/);
    userEvent.click(sortByViewCount);

    clickSearchButton();

    const expectedInput: UnitFilterInputData<'unitId' | 'viewCount'> = overrideObject(
      generateFilterInput('viewCount'),
      {sortBy: 'viewCount'},
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('passes input data with multiple conditions', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const characterButton = await screen.findByText(translationEN.enum.unitType[UnitType.CHARACTER]);
    userEvent.click(characterButton);
    const elemButton = await screen.findByText('elem A EN');
    userEvent.click(elemButton);
    const weaponButton = await screen.findByText('weapon B EN');
    userEvent.click(weaponButton);
    const searchInput = await screen.findByText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput.previousSibling as Element, 'test');

    clickSearchButton();

    const expectedInput: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {
        keyword: 'test',
        type: UnitType.CHARACTER,
        elements: [1],
        weaponTypes: [2],
      },
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('triggers search on entering `enter`', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(getEnumElements).toHaveBeenCalledTimes(1);

    const searchInput = await screen.findByText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput.previousSibling as Element, 'test');
    userEvent.type(searchInput.previousSibling as Element, '{enter}');

    const expectedInput: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {keyword: 'test'},
    );

    expect(onSearchRequested).toHaveBeenCalledWith(expectedInput);
  });

  it('renders additional input', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
        getAdditionalInputs={() => [{
          type: 'title',
          title: 'Title',
          description: 'Description',
        }]}
      />
    ));

    expect(await screen.findByText('Title')).toBeInTheDocument();
  });

  it('shows ads', async () => {
    renderReact(() => (
      <UnitFilter
        sortOrderNames={{unitId: () => 'Unit ID'}}
        onSearchRequested={onSearchRequested}
        generateInputData={() => generateFilterInput('unitId')}
      />
    ));

    expect(screen.getByTestId('ads-page-top')).toBeInTheDocument();
  });

  it('hides ads', async () => {
    renderReact(
      () => (
        <UnitFilter
          sortOrderNames={{unitId: () => 'Unit ID'}}
          onSearchRequested={onSearchRequested}
          generateInputData={() => generateFilterInput('unitId')}
        />
      ),
      {hasSession: true, user: {adsFreeExpiry: new Date()}},
    );

    expect(screen.queryByText('ads-page-top')).not.toBeInTheDocument();
  });

  it('shows loading if disabled', async () => {
    renderReact(
      () => (
        <UnitFilter
          sortOrderNames={{unitId: () => 'Unit ID'}}
          onSearchRequested={onSearchRequested}
          generateInputData={() => generateFilterInput('unitId')}
          disabled
        />
      ),
      {hasSession: true, user: {adsFreeExpiry: new Date()}},
    );

    expect(screen.getByText('', {selector: 'div.spinner-grow'})).toBeInTheDocument();
  });
});
