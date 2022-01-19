import React from 'react';

import {useSession} from 'next-auth/react';

import {
  ApiResponseCode,
  isFailedResponse,
  SequencedPostInfo,
  SequencedPostListResponse,
} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {FunctionFetchPostList} from '../../../../utils/services/api';
import {AdsPostList} from '../../common/ads/main';
import {useFetchState} from '../../common/fetch';
import {Loading} from '../../common/loading';
import {AlertFetchListFailed} from '../alert';
import {PostManageBar, PostManageBarProps} from '../manageBar';
import styles from './page.module.scss';


type PostListPageProps<R extends SequencedPostListResponse> = {
  title: string,
  postManageBarProps: PostManageBarProps,
  fnFetchList: FunctionFetchPostList<R>,
  renderPostEntries: (response: R) => React.ReactElement,
};

export const PostLookupPage = <E extends SequencedPostInfo, R extends SequencedPostListResponse<E>>({
  title,
  postManageBarProps,
  fnFetchList,
  renderPostEntries,
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

  fetchPostList();

  const ListContent = () => {
    if (fetchStatus.fetching) {
      return <Loading/>;
    }

    if (fetchStatus.data && !isFailedResponse(fetchStatus.data)) {
      return <>{renderPostEntries(fetchStatus.data)}</>;
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
      {
        data?.user.isAdmin &&
        <PostManageBar {...postManageBarProps}/>
      }
      <ListContent/>
    </>
  );
};
