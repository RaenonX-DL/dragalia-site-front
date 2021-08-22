import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../../utils/services/resources/loader';
import {UnitInfoLookupInput} from './main';
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

  beforeEach(() => {
    onSearchRequested = jest.fn().mockImplementation(() => jest.fn());
    jest.spyOn(ResourceLoader, 'getEnumElements')
      .mockImplementation(async (callback) => {
        if (callback) {
          callback(elemEnums);
        }
        return elemEnums;
      });
    jest.spyOn(ResourceLoader, 'getEnumWeaponTypes')
      .mockImplementation(async (callback) => {
        if (callback) {
          callback(weaponEnums);
        }
        return weaponEnums;
      });
  });

  it('shows post manage bar if the user is an admin', async () => {
    renderReact(
      () => (<UnitInfoLookupInput onSearchRequested={onSearchRequested}/>),
      {user: {isAdmin: true}},
    );

    screen.getByText(translationEN.posts.manage.addChara);
  });
});
