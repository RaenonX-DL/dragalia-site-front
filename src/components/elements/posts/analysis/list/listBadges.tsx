import React from 'react';

import {Badge} from 'react-bootstrap';

import {AnalysisListEntry, AnalysisType} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {PostEntryBadgesProps} from '../../shared/list/entry';

const postTypeName: { [type in AnalysisType]: string } = {
  [AnalysisType.CHARACTER]: 'posts.analysis.type.character',
  [AnalysisType.DRAGON]: 'posts.analysis.type.dragon',
};

type AnalysisEntryBadgesProps<E extends AnalysisListEntry> = PostEntryBadgesProps<E>

export const AnalysisEntryBadges = <E extends AnalysisListEntry>({entry}: AnalysisEntryBadgesProps<E>) => {
  const {t} = useTranslation();

  return (
    <>
      <span className="h4"><Badge variant="success">{t(postTypeName[entry.type])}</Badge></span>&nbsp;
      <span className="h4"><Badge variant="success">#{entry.seqId}</Badge></span>
    </>
  );
};
