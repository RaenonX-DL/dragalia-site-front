import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {AnalysisPostLookup} from '../../../elements/posts/analysis/lookup/lookup';
import {PageProps} from '../../props';


export const AnalysisLookup = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  const title = t((t) => t.meta.inUse.analysisList.title);

  fnSetTitle(title);

  return (
    <AnalysisPostLookup/>
  );
};
