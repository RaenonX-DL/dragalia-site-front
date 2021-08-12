import React from 'react';

import {UnitFilter} from '../../elements/gameData/unit/filter/main';
import {orderName} from './const';
import {unitTierData} from './mock';
import {TierListOutput} from './out/main';
import {InputData} from './types';
import {generateInputData} from './utils';


export const TierList = () => {
  const [inputData, setInputData] = React.useState<InputData>();

  return (
    <>
      <UnitFilter
        onSearchRequested={(inputData) => () => setInputData(inputData)}
        sortOrderNames={orderName}
        generateInputData={generateInputData}
      />
      <hr/>
      {inputData && <TierListOutput inputData={inputData} tierData={unitTierData}/>}
    </>
  );
};
