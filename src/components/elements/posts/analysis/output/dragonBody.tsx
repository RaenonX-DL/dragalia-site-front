import React from 'react';

import {DragonAnalysis} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';


export const AnalysisOutputDragonBody = ({analysis}: SectionProps<DragonAnalysis>) => {
  const {t} = useTranslation();

  return (
    <>
      <h3 className="mb-3">{t('posts.analysis.ultimate')}</h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.ultimate}</Markdown>
      </div>
      <h3 className="mb-3">{t('posts.analysis.notes_dragon')}</h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.notes}</Markdown>
      </div>
      <h3 className="mb-3">{t('posts.analysis.suitable')}</h3>
      <div className="rounded bg-black-32 p-3 mb-3">
        <Markdown>{analysis.suitableCharacters}</Markdown>
      </div>
    </>
  );
};
