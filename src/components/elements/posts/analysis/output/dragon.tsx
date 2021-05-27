import React from 'react';

import {DragonAnalysisGetResponse} from '../../../../../api-def/api';
import {AnalysisOutputBase} from './base';
import {AnalysisOutputDragonBody} from './dragonBody';
import {SectionProps} from './props';

export const AnalysisOutputDragon = ({analysis}: SectionProps<DragonAnalysisGetResponse>) => (
  <AnalysisOutputBase
    analysis={analysis}
    renderBody={(analysis) => <AnalysisOutputDragonBody analysis={analysis}/>}
  />
);
