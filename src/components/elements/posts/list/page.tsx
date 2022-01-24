import React from 'react';

import {useSession} from 'next-auth/react';

import {
  ApiResponseCode,
  isFailedResponse,
  SequencedPostInfo,
  SequencedPostListResponse,
  SubscriptionKeyConstName,
} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {FunctionFetchPostList} from '../../../../utils/services/api';
import {AdsPostList} from '../../common/ads/main';
import {SubscriptionButtonBar} from '../../common/button/subscribe/bar';
import {useSubscribeButtonState} from '../../common/button/subscribe/hook';
import {isNotFetched, useFetchState} from '../../common/fetch';
import {Loading} from '../../common/loading';
import {AlertFetchListFailed} from '../alert';
import {PostManageBar, PostManageBarProps} from '../manageBar';
import styles from './page.module.css';


type PostListRenderPostEntryProps<R extends SequencedPostListResponse> = {
  response: R,
  globalSubscribed: boolean,
};

type PostListPageProps<R extends SequencedPostListResponse> = {
  title: string,
  postManageBarProps: PostManageBarProps,
  fnFetchList: FunctionFetchPostList<R>,
  renderPostEntries: (props: PostListRenderPostEntryProps<R>) => React.ReactElement,
  subKeyName: SubscriptionKeyConstName,
};

export const PostLookupPage = <E extends SequencedPostInfo, R extends SequencedPostListResponse<E>>({
  title,
  postManageBarProps,
  fnFetchList,
  renderPostEntries,
  subKeyName,
}: PostListPageProps<R>) => {
  const {lang} = useI18n();
  const {data} = useSession();
  const {
    fetchStatus,
    fetchFunction: fetchPostList,
  } = useFetchState<R | undefined>(
    undefined,
    () => fnFetchList(data?.user.id.toString() || '', lang),
    'Failed to fetch post list.',
  );
  const {
    reactState: globalSubscriptionButtonState,
    state: globalSubscriptionState,
  } = useSubscribeButtonState({
    dependencies: [fetchStatus.data],
    getSubscribedOnEffect: () => fetchStatus.data?.userSubscribed,
  });

  fetchPostList();

  const ListContent = () => {
    if (fetchStatus.fetching) {
      return <Loading/>;
    }

    if (fetchStatus.data && !isFailedResponse(fetchStatus.data)) {
      return (
        <>
          {renderPostEntries({
            response: fetchStatus.data,
            globalSubscribed: globalSubscriptionState.subscribed,
          })}
        </>
      );
    }

    return (
      <AlertFetchListFailed
        failureMessage={ApiResponseCode[fetchStatus.data?.code || ApiResponseCode.NOT_EXECUTED]}
      />
    );
  };

  return (
    <>
      <AdsPostList/>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <SubscriptionButtonBar
        subscriptionKey={{type: 'const', name: subKeyName}}
        state={globalSubscriptionButtonState}
        disabled={isNotFetched(fetchStatus)}
      />
      {
        data?.user.isAdmin &&
        <PostManageBar {...postManageBarProps}/>
      }
      <ListContent/>
    </>
  );
};
