import React from 'react';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../common/ads';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';

export const SectionTop = <R extends AnalysisGetResponse>({analysis}: SectionProps<R>) => {
  const {t} = useI18n();

  return (
    <>
      <PageAnchor
        name="summary" type="h3"
        text={t((t) => t.posts.analysis.summary)}
        className="mb-3"
      />
      <div className="rounded bg-black-32 p-3">
        <Markdown>{analysis.summary || 'N/A'}</Markdown>
      </div>
      <AdsInPost/>
      {
        analysis.summonResult &&
        <>
          <hr/>
          <PageAnchor
            name="summon" type="h3"
            text={t((t) => t.posts.analysis.summonResult)}
            className="mb-3"
          />
          <div className="rounded bg-black-32 p-3">
            <Markdown>{analysis.summonResult}</Markdown>
          </div>
        </>
      }
      <hr/>
      <PageAnchor
        name="passive" type="h3"
        text={t((t) => t.posts.analysis.passive)}
        className="mb-3"
      />
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.passives || 'N/A'}</Markdown>
      </div>
      {
        analysis.normalAttacks &&
        <>
          <PageAnchor
            name="normal-attack" type="h3"
            text={t((t) => t.posts.analysis.normalAttack)}
            className="mb-3"
          />
          <div className="rounded bg-black-32 p-3 mb-3">
            <Markdown>{analysis.normalAttacks}</Markdown>
          </div>
        </>
      }
    </>
  );
};
