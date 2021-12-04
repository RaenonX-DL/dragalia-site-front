import React from 'react';

import {CompleteEntryNoAnalysis} from './complete/noAnalysis';
import {IconOnlyEntryNoAnalysis} from './iconOnly/noAnalysis';
import {EntryProps} from './types';


type Props = EntryProps;

export const EntryNoAnalysis = (props: Props) => {
  const {iconOnly} = props;

  return (
    iconOnly ?
      <IconOnlyEntryNoAnalysis {...props}/> :
      <CompleteEntryNoAnalysis {...props}/>
  );
};
