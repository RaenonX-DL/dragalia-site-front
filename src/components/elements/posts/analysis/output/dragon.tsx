import React from 'react';

import {DragonAnalysis} from '../../../../../api-def/api';
import {AnalysisOutputBase} from './base';
import {AnalysisOutputDragonBody} from './dragonBody';
import {SectionProps} from './props';

export const AnalysisOutputDragon = ({analysis}: SectionProps<DragonAnalysis>) => (
  <AnalysisOutputBase
    analysis={analysis}
    renderBody={(analyais) => <AnalysisOutputDragonBody analysis={analyais}/>}
  />
);
