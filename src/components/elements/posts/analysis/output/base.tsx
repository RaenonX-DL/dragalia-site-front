import React from 'react';

import {AnalysisGetSuccessResponse} from '../../../../../api-def/api';
import {GeneralPath, makeSimplePath, makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
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
  const {t, lang} = useI18n();

  return (
    <>
      {
        analysis.isAdmin &&
        <PostManageBar
          newButtons={[
            {
              url: makeSimplePath(GeneralPath.ANALYSIS_NEW_CHARA, {lang}),
              title: t((t) => t.posts.manage.addChara),
            },
            {
              url: makeSimplePath(GeneralPath.ANALYSIS_NEW_DRAGON, {lang}),
              title: t((t) => t.posts.manage.addDragon),
            },
          ]}
          editPostUrl={makePostPath(PostPath.ANALYSIS_EDIT, {pid: analysis.seqId, lang})}
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
