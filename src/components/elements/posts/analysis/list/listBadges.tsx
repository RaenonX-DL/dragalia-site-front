import React from 'react';

import {Badge} from 'react-bootstrap';

import {AnalysisListEntry, UnitType} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {GetTranslationFunction} from '../../../../../i18n/types';
import {PostEntryBadgesProps} from '../../shared/list/entry';

const postTypeName: { [type in UnitType]: GetTranslationFunction } = {
  [UnitType.CHARACTER]: (t) => t.posts.analysis.type.character,
  [UnitType.DRAGON]: (t) => t.posts.analysis.type.dragon,
};

type AnalysisEntryBadgesProps<E extends AnalysisListEntry> = PostEntryBadgesProps<E>

export const AnalysisEntryBadges = <E extends AnalysisListEntry>({entry}: AnalysisEntryBadgesProps<E>) => {
  const {t} = useI18n();

  return (
    <>
      <span className="h4"><Badge variant="success">{t(postTypeName[entry.type])}</Badge></span>&nbsp;
      <span className="h4"><Badge variant="success">#{entry.seqId}</Badge></span>
    </>
  );
};
