import React from 'react';

import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {AnalysisLookupInput} from './in/main';
import {InputData} from './in/types';
import {AnalysisLookupOutput} from './out/main';

export const AnalysisPostLookup = () => {
  const [inputForward, setInputForward] = React.useState<InputData>();

  return (
    <>
      <AnalysisLookupInput
        onSearchRequested={(data) => () => {
          GoogleAnalytics.analysisLookup(data);
          setInputForward(data);
        }}
      />
      {inputForward && <AnalysisLookupOutput inputData={inputForward}/>}
    </>
  );
};
