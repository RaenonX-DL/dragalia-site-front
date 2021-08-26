import React from 'react';

import {waitFor} from '@testing-library/react';

import unitInfo from '../../../../../../../test/data/resources/info/chara.json';
import {renderReact} from '../../../../../../../test/render/main';
import {overrideObject} from '../../../../../../utils/override';
import {sortFunc} from '../in/sort/lookup';
import {InputData} from '../in/types';
import {generateInputData} from '../in/utils';
import {UnitInfoLookupOutput} from './main';


describe('Unit info lookup output', () => {
  let fnSortByUnitId: jest.SpyInstance;

  beforeEach(() => {
    fnSortByUnitId = jest.spyOn(sortFunc, 'unitId');
  });

  it('sorts the output', async () => {
    const inputData: InputData = overrideObject(generateInputData(), {sortBy: 'unitId'});

    renderReact(() => (
      <UnitInfoLookupOutput
        inputData={inputData}
        prioritizedUnitInfo={unitInfo}
        otherUnitInfo={[]}
        analyses={{}}
      />
    ));

    await waitFor(() => expect(fnSortByUnitId).toHaveBeenCalled());
  });
});
