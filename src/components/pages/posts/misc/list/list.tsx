import React from 'react';

import {PostType} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostList} from '../../../../elements/posts/list/main';
import {PostLookupPage} from '../../../../elements/posts/list/page';
import {MiscEntryBadge} from './badge';


export const MiscPostList = () => {
  const {t} = useI18n();

  const title = t((t) => t.meta.inUse.post.misc.list.title);

  return (
    <PostLookupPage
      title={title}
      fnFetchList={ApiRequestSender.miscList}
      postManageBarProps={{
        newButtons: [{pathname: GeneralPath.MISC_NEW}],
      }}
      renderPostEntries={({response, globalSubscribed}) => (
        <PostList
          entries={response.posts}
          postType={PostType.MISC}
          renderPostBadge={(props) => <MiscEntryBadge {...props}/>}
          disableSubscription={globalSubscribed}
        />
      )}
      subKeyName="ALL_MISC"
    />
  );
};
