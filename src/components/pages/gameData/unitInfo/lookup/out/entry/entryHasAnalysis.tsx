import React from 'react';

import {CompleteEntryWithAnalysis} from './complete/hasAnalysis';
import {IconOnlyEntryWithAnalysis} from './iconOnly/hasAnalysis';
import {EntryPropsHasAnalysis} from './types';


type Props = EntryPropsHasAnalysis;

export const EntryWithAnalysis = (props: Props) => {
  const {iconOnly} = props;

  return (
    iconOnly ?
      <IconOnlyEntryWithAnalysis {...props}/> :
      <CompleteEntryWithAnalysis {...props}/>
  );
};
