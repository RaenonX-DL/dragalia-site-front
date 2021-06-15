import React from 'react';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../common/ads/main';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';


export const SectionTop = <R extends AnalysisGetResponse>({analysis}: SectionProps<R>) => {
  const {t} = useI18n();

  return (
    <>
      <h3 className="mb-3">
        {t((t) => t.posts.analysis.summary)}
      </h3>
      <div className="rounded bg-black-32 p-3">
        <Markdown>{analysis.summary || 'N/A'}</Markdown>
      </div>
      <AdsInPost/>
      {
        analysis.summonResult &&
        <>
          <hr/>
          <h3 className="mb-3">
            {t((t) => t.posts.analysis.summonResult)}
          </h3>
          <div className="rounded bg-black-32 p-3">
            <Markdown>{analysis.summonResult}</Markdown>
          </div>
        </>
      }
      <hr/>
      <h3 className="mb-3">
        {t((t) => t.posts.analysis.passive)}
      </h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.passives || 'N/A'}</Markdown>
      </div>
      {
        analysis.normalAttacks &&
        <>
          <h3 className="mb-3">
            {t((t) => t.posts.analysis.normalAttack)}
          </h3>
          <div className="rounded bg-black-32 p-3 mb-3">
            <Markdown>{analysis.normalAttacks}</Markdown>
          </div>
        </>
      }
    </>
  );
};
