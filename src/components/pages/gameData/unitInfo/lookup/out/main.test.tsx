import React from 'react';

import unitInfo from '../../../../../../../test/data/resources/info/chara.json';
import {renderReact} from '../../../../../../../test/render/main';
import {overrideObject} from '../../../../../../utils/override';
import {InputData} from '../in/types';
import {generateInputData} from '../in/utils';
import {UnitInfoLookupOutput} from './main';


describe('Unit info lookup output', () => {
  it('renders the output', async () => {
    const inputData: InputData = overrideObject(generateInputData(), {sortBy: 'unitId'});

    renderReact(() => (
      <UnitInfoLookupOutput
        inputData={inputData}
        prioritizedUnitInfo={unitInfo}
        otherUnitInfo={[]}
        analyses={{}}
        disableSubscription={false}
      />
    ));
  });
});
