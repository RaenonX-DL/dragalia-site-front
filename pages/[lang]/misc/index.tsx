import React from 'react';

import {PostListPage} from '../../../src/components/elements/posts/list/page';
import {MiscPostList} from '../../../src/components/pages/posts/misc/list/list';
import {GeneralPath, PostPath} from '../../../src/const/path/definitions';
import {useI18n} from '../../../src/i18n/hook';
import {makePostUrl} from '../../../src/utils/path/make';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';


const MiscList = () => {
  const {t, lang} = useI18n();

  const title = t((t) => t.meta.inUse.post.misc.list.title);

  return (
    <PostListPage
      title={title}
      fnFetchList={ApiRequestSender.miscList}
      postManageBarProps={{
        newButtons: [{pathname: GeneralPath.MISC_NEW}],
      }}
      renderPostEntries={(response) => (
        <MiscPostList
          entries={response.posts}
          generateLink={(postId) => (
            makePostUrl(PostPath.MISC, {pid: postId, lang})
          )}
        />
      )}
    />
  );
};

export default MiscList;
