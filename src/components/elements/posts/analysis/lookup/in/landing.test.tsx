import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {AnalysisLookupEntry, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {AnalysisLookupLanding} from './landing';

describe('Analysis lookup top section upon landing', () => {
  const analyses: Array<AnalysisLookupEntry> = [
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

  it('shows analyses on fetched', async () => {
    await renderReact(() => (<AnalysisLookupLanding analyses={analyses}/>));

    await waitFor(() => {
      screen.getByText('Gala Leonidas');
    });
  });
});
