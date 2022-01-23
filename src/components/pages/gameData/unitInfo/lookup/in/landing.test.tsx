import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {UnitInfoLookupEntry, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {UnitInfoLookupLanding} from './landing';


describe('Analysis lookup top section upon landing', () => {
  const analyses: Array<UnitInfoLookupEntry> = [
    {
      type: UnitType.CHARACTER,
      unitId: 10950101,
      lang: SupportedLanguages.CHT,
      viewCount: 107,
      modifiedEpoch: 5000000,
      publishedEpoch: 900000,
      userSubscribed: true,
    },
    {
      type: UnitType.CHARACTER,
      unitId: 10950102,
      lang: SupportedLanguages.CHT,
      viewCount: 207,
      modifiedEpoch: 5000000,
      publishedEpoch: 900000,
      userSubscribed: true,
    },
    {
      type: UnitType.CHARACTER,
      unitId: 10850103,
      lang: SupportedLanguages.CHT,
      viewCount: 307,
      modifiedEpoch: 5000000,
      publishedEpoch: 900000,
      userSubscribed: true,
    },
  ];

  it('shows analyses on fetched', async () => {
    renderReact(() => <UnitInfoLookupLanding analyses={analyses} disableSubscription={false}/>);

    await waitFor(() => screen.getByText('Gala Leonidas'), {timeout: 2000});
  });
});
