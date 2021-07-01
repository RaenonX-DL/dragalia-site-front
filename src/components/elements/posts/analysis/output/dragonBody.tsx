import React from 'react';

import {DragonAnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../common/ads/main';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';


export const AnalysisOutputDragonBody = ({analysis}: SectionProps<DragonAnalysisGetResponse>) => {
  const {t} = useI18n();

  return (
    <>
      <h3 className="mb-3">{t((t) => t.posts.analysis.ultimate)}</h3>
      <Markdown>{analysis.ultimate}</Markdown>
      <AdsInPost/>
      <h3 className="mb-3">{t((t) => t.posts.analysis.notesDragon)}</h3>
      <Markdown>{analysis.notes}</Markdown>
      <h3 className="my-3">{t((t) => t.posts.analysis.suitable)}</h3>
      <Markdown>{analysis.suitableCharacters}</Markdown>
    </>
  );
};
