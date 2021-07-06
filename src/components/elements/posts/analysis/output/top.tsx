import React from 'react';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../common/ads/main';
import {OverlayPopover} from '../../../common/overlay/popover';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';


export const SectionTop = <R extends AnalysisGetResponse>({analysis}: SectionProps<R>) => {
  const {t} = useI18n();

  return (
    <>
      <h3 className="mb-3">
        {t((t) => t.posts.analysis.summary)}
      </h3>
      <Markdown>{analysis.summary || 'N/A'}</Markdown>
      <AdsInPost/>
      {
        analysis.summonResult &&
        <>
          <hr/>
          <h3 className="mb-3">
            {t((t) => t.posts.analysis.summonResult)}&nbsp;
            <OverlayPopover
              title={t((t) => t.posts.analysis.summonExplanation.title)}
              content={t((t) => t.posts.analysis.summonExplanation.description)}
            >
              <i className="bi bi-info-circle"/>
            </OverlayPopover>
          </h3>
          <Markdown>{analysis.summonResult}</Markdown>
        </>
      }
      <hr/>
      <h3 className="mb-3">
        {t((t) => t.posts.analysis.passive)}
      </h3>
      <Markdown>{analysis.passives || 'N/A'}</Markdown>
      {
        analysis.normalAttacks &&
        <>
          <h3 className="my-3">
            {t((t) => t.posts.analysis.normalAttack)}
          </h3>
          <Markdown>{analysis.normalAttacks}</Markdown>
        </>
      }
    </>
  );
};
