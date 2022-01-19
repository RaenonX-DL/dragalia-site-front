import React from 'react';

import {useSession} from 'next-auth/react';

import {MiscPostGetResponse} from '../../../../../api-def/api';
import {GeneralPath, makePostUrl, PostPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../../elements/common/ads/main';
import {PostManageBar} from '../../../../elements/posts/manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../../../elements/posts/output/alert';
import {PostInfo} from '../../../../elements/posts/output/info';
import {MiscSectionOutput} from './section';


type Props = {
  post: MiscPostGetResponse,
};

export const MiscPostOutput = ({post}: Props) => {
  const {lang} = useI18n();
  const {data} = useSession();

  return (
    <>
      {
        data?.user.isAdmin &&
        <PostManageBar
          newButtons={[{pathname: GeneralPath.MISC_NEW}]}
          editPostUrl={makePostUrl(PostPath.MISC_EDIT, {pid: post.seqId, lang})}
        />
      }
      {post.isAltLang && <AlertIsAlternativeLanguage response={post}/>}
      {
        post.otherLangs.length > 0 &&
        <AlertOtherLanguageAvailable response={post} pid={post.seqId} targetPath={PostPath.MISC}/>
      }
      <AdsInPost/>
      <MiscSectionOutput sections={post.sections}/>
      <AdsInPost/>
      <PostInfo post={post}/>
    </>
  );
};
