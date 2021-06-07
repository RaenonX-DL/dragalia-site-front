import React from 'react';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {GeneralPath, PostPath} from '../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {makePostPath} from '../../../../../utils/path/make';
import {AdsInPost} from '../../../common/ads';
import {PostManageBar} from '../../manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../shared/output/alert';
import {PostInfo} from '../../shared/output/info';
import {SectionBottom} from './bottom';
import {SectionTop} from './top';


type AnalysisOutputBaseProps<R extends AnalysisGetResponse> = {
  analysis: R,
  renderBody: (post: R) => React.ReactElement,
}

export const AnalysisOutputBase = <R extends AnalysisGetResponse>({
  analysis,
  renderBody,
}: AnalysisOutputBaseProps<R>) => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

  return (
    <>
      {
        context?.isAdmin &&
        <PostManageBar
          newButtons={[
            {
              url: GeneralPath.ANALYSIS_NEW_CHARA,
              title: t((t) => t.posts.manage.addChara),
            },
            {
              url: GeneralPath.ANALYSIS_NEW_DRAGON,
              title: t((t) => t.posts.manage.addDragon),
            },
          ]}
          editPostUrl={makePostPath(PostPath.ANALYSIS_EDIT, {pid: analysis.unitId})}
        />
      }
      {analysis.isAltLang && <AlertIsAlternativeLanguage response={analysis}/>}
      {
        analysis.otherLangs.length > 0 &&
        <AlertOtherLanguageAvailable response={analysis} pid={analysis.unitId} targetPath={PostPath.ANALYSIS}/>
      }

      <SectionTop analysis={analysis}/>
      <AdsInPost/>
      {renderBody(analysis)}
      <SectionBottom analysis={analysis}/>
      <AdsInPost/>

      <hr/>

      <PostInfo post={analysis}/>
    </>
  );
};
