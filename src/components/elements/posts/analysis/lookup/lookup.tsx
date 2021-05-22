import React from 'react';

import {AnalysisLookupInput} from './in/main';
import {InputData} from './in/types';

export const AnalysisPostLookup = () => {
  const onSearchRequested = (data: InputData) => () => {
    console.log(data);
  };

  return (
    <AnalysisLookupInput onSearchRequested={onSearchRequested}/>
  );
};
