import React from 'react';

import {DragonAnalysis} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';


export const AnalysisOutputDragonBody = ({analysis}: SectionProps<DragonAnalysis>) => {
  const {t} = useI18n();

  return (
    <>
      <h3 className="mb-3">{t((t) => t.posts.analysis.ultimate)}</h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.ultimate}</Markdown>
      </div>
      <h3 className="mb-3">{t((t) => t.posts.analysis.notesDragon)}</h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.notes}</Markdown>
      </div>
      <h3 className="mb-3">{t((t) => t.posts.analysis.suitable)}</h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.suitableCharacters}</Markdown>
      </div>
    </>
  );
};
