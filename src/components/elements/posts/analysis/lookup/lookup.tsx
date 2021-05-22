import React from 'react';

import {AnalysisLookupInput} from './in/main';
import {InputData} from './in/types';
import {AnalysisLookupOutput} from './out/main';

export const AnalysisPostLookup = () => {
  const [inputForward, setInputForward] = React.useState<InputData>();

  return (
    <>
      <AnalysisLookupInput onSearchRequested={(data) => () => {
        setInputForward(data);
      }}/>
      {inputForward && <AnalysisLookupOutput inputData={inputForward}/>}
    </>
  );
};
