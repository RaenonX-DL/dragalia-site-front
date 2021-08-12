import React from 'react';

import {waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {ApiResponseCode, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {overrideObject} from '../../../../../../utils/override';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {sortFunc} from '../in/sort/lookup';
import {InputData} from '../in/types';
import {generateInputData} from '../in/utils';
import {UnitInfoLookupOutput} from './main';


describe('Unit info lookup output', () => {
  let fnSortByViewCount: jest.SpyInstance;

  beforeEach(() => {
    fnSortByViewCount = jest.spyOn(sortFunc, 'viewCount');

    jest.spyOn(ApiRequestSender, 'analysisLookup').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      analyses: {
        10950101: {
          type: UnitType.CHARACTER,
          unitId: 10950101,
          lang: SupportedLanguages.CHT,
          viewCount: 107,
          modifiedEpoch: 5000000,
          publishedEpoch: 900000,
        },
        10950102: {
          type: UnitType.CHARACTER,
          unitId: 10950102,
          lang: SupportedLanguages.CHT,
          viewCount: 207,
          modifiedEpoch: 5000000,
          publishedEpoch: 900000,
        },
      },
    });
  });

  it(
    'sorts the output',
    async () => {
      const inputData: InputData = overrideObject(generateInputData(), {sortBy: 'viewCount'});

      renderReact(() => <UnitInfoLookupOutput inputData={inputData}/>);

      await waitFor(() => expect(fnSortByViewCount).toHaveBeenCalled());
    },
    10000,
  );
});
