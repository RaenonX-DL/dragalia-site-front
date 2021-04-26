import React from 'react';

import {Badge} from 'react-bootstrap';

import {AnalysisListEntry, AnalysisType} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {PostEntryBadgesProps} from '../../shared/list/entry';

const getPostTypeName = (type: AnalysisType) => {
  const {t} = useTranslation();

  if (type === AnalysisType.CHARACTER) {
    return t('posts.analysis.type.character');
  } else if (type === AnalysisType.DRAGON) {
    return t('posts.analysis.type.dragon');
  } else {
    return t('posts.analysis.type.uncategorized');
  }
};

type AnalysisEntryBadgesProps<E extends AnalysisListEntry> = PostEntryBadgesProps<E>

export const AnalysisEntryBadges = <E extends AnalysisListEntry>({entry}: AnalysisEntryBadgesProps<E>) => {
  return (
    <>
      <span className="h4"><Badge variant="success">{getPostTypeName(entry.type)}</Badge></span>&nbsp;
      <span className="h4"><Badge variant="success">#{entry.seqId}</Badge></span>
    </>
  );
};
