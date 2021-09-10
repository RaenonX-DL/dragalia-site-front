import React from 'react';

import {GeneralPath, PostPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl} from '../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostList} from '../../../../elements/posts/list/main';
import {PostLookupPage} from '../../../../elements/posts/list/page';
import {MiscEntryBadge} from './listBadges';


export const MiscPostList = () => {
  const {t, lang} = useI18n();

  const title = t((t) => t.meta.inUse.post.misc.list.title);

  return (
    <PostLookupPage
      title={title}
      fnFetchList={ApiRequestSender.miscList}
      postManageBarProps={{
        newButtons: [{pathname: GeneralPath.MISC_NEW}],
      }}
      renderPostEntries={(response) => (
        <PostList
          entries={response.posts}
          generateLink={(postId) => (
            makePostUrl(PostPath.MISC, {pid: postId, lang})
          )}
          renderPostBadge={(props) => <MiscEntryBadge {...props}/>}
        />
      )}
    />
  );
};
