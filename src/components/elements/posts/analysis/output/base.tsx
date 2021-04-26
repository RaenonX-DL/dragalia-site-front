import React from 'react';

import {AnalysisGetSuccessResponse} from '../../../../../api-def/api';
import Path from '../../../../../const/path/definitions';
import {useTranslation} from '../../../../../i18n/utils';
import {AdsInPost, PostInfo, PostManageBar} from '../../../../elements';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../shared/output/alert';
import {SectionBottom} from './bottom';
import {SectionTop} from './top';

type AnalysisOutputBaseProps<R extends AnalysisGetSuccessResponse> = {
  analysis: R,
  renderBody: (post: R) => React.ReactNode,
}


export const AnalysisOutputBase = <R extends AnalysisGetSuccessResponse>({
  analysis,
  renderBody,
}: AnalysisOutputBaseProps<R>) => {
  const {t} = useTranslation();

  return (
    <>
      {
        analysis.isAdmin &&
        <PostManageBar
          newButtons={[
            {url: Path.ANALYSIS_NEW_CHARA, title: t('posts.manage.add_chara')},
            {url: Path.ANALYSIS_NEW_DRAGON, title: t('posts.manage.add_dragon')},
          ]}
          editPostUrl={Path.getAnalysisEdit(analysis.seqId)}
        />
      }
      {analysis.isAltLang && <AlertIsAlternativeLanguage response={analysis}/>}
      {analysis.otherLangs.length > 0 && <AlertOtherLanguageAvailable response={analysis}/>}

      <SectionTop analysis={analysis}/>
      {analysis.showAds && <AdsInPost/>}
      {renderBody(analysis)}
      <SectionBottom analysis={analysis}/>
      {analysis.showAds && <AdsInPost/>}

      <hr/>

      <PostInfo post={analysis}/>
    </>
  );
};
