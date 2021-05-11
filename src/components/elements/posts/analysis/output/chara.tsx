import React from 'react';

import {CharacterAnalysis} from '../../../../../api-def/api';
import {AnalysisOutputBase} from './base';
import {AnalysisOutputCharaBody} from './charaBody';
import {SectionProps} from './props';


export const AnalysisOutputChara = ({analysis}: SectionProps<CharacterAnalysis>) => (
  <AnalysisOutputBase
    analysis={analysis}
    renderBody={(post) => <AnalysisOutputCharaBody analysis={post}/>}
  />
);
