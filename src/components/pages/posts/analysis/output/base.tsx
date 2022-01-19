import React from 'react';

import {useSession} from 'next-auth/react';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {GeneralPath, makePostUrl, PostPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../../elements/common/ads/main';
import {PostManageBar} from '../../../../elements/posts/manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../../../elements/posts/output/alert';
import {PostInfo} from '../../../../elements/posts/output/info';
import {SectionBottom} from './bottom';
import {SectionTop} from './top';


type AnalysisOutputBaseProps<R extends AnalysisGetResponse> = {
  analysis: R,
  renderBody: (post: R) => React.ReactElement,
};

export const AnalysisOutputBase = <R extends AnalysisGetResponse>({
  analysis,
  renderBody,
}: AnalysisOutputBaseProps<R>) => {
  const {t, lang} = useI18n();
  const {data} = useSession();

  return (
    <>
      {
        data?.user.isAdmin &&
        <PostManageBar
          newButtons={[
            {
              pathname: GeneralPath.ANALYSIS_NEW_CHARA,
              text: t((t) => t.posts.manage.addChara),
            },
            {
              pathname: GeneralPath.ANALYSIS_NEW_DRAGON,
              text: t((t) => t.posts.manage.addDragon),
            },
          ]}
          editPostUrl={makePostUrl(PostPath.ANALYSIS_EDIT, {pid: analysis.unitId, lang})}
        />
      }
      {analysis.isAltLang && <AlertIsAlternativeLanguage response={analysis}/>}
      {
        analysis.otherLangs.length > 0 &&
        <AlertOtherLanguageAvailable response={analysis} pid={analysis.unitId} targetPath={PostPath.ANALYSIS}/>
      }

      <SectionTop analysis={analysis}/>
      <div className="mb-3"/>
      <AdsInPost/>
      {renderBody(analysis)}
      <SectionBottom analysis={analysis}/>
      <AdsInPost/>

      <hr/>

      <PostInfo post={analysis}/>
    </>
  );
};
