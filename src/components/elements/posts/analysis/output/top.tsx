import React from 'react';

import {AnalysisGetSuccessResponse} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {AdsInPost} from '../../../common/ads';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';

export const SectionTop = <R extends AnalysisGetSuccessResponse>({analysis}: SectionProps<R>) => {
  const {t} = useTranslation();

  return (
    <>
      <PageAnchor name="summary" type="h3" text={t('posts.analysis.summary')} className="mb-3"/>
      <div className="rounded bg-black-32 p-3">
        <Markdown>{analysis.summary || 'N/A'}</Markdown>
      </div>
      {analysis.showAds && <AdsInPost/>}
      {
        analysis.summonResult &&
        <>
          <hr/>
          <PageAnchor name="summon" type="h3" text={t('posts.analysis.summon_result')} className="mb-3"/>
          <div className="rounded bg-black-32 p-3">
            <Markdown>{analysis.summonResult}</Markdown>
          </div>
        </>
      }
      <hr/>
      <PageAnchor name="passive" type="h3" text={t('posts.analysis.passive')} className="mb-3"/>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.passives || 'N/A'}</Markdown>
      </div>
      {
        analysis.normalAttacks &&
        <>
          <PageAnchor
            name="normal-attack" type="h3"
            text={t('posts.analysis.normal_attack')} className="mb-3"
          />
          <div className="rounded bg-black-32 p-3 mb-3">
            <Markdown>{analysis.normalAttacks}</Markdown>
          </div>
        </>
      }
    </>
  );
};
