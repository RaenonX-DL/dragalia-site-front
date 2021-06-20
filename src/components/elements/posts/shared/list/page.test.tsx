import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode} from '../../../../../api-def/api/responseCode';
import {PostPath} from '../../../../../const/path/definitions';
import {PostListPage} from './page';


describe('Post list page', () => {
  const title = 'listTitle';
  let fnFetchList: jest.Mock;

  beforeEach(() => {
    fnFetchList = jest.fn().mockResolvedValue({});
  });

  it('shows correct page title', async () => {
    renderReact(() => (
      <PostListPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
      />
    ));

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('shows ads', async () => {
    renderReact(() => (
      <PostListPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
      />
    ));

    expect(screen.getByTestId('ads-post-list')).toBeInTheDocument();
  });

  it('shows correct post manage bars', async () => {
    const newPostButtonTitle = 'New Post';

    renderReact(
      () => (
        <PostListPage
          title={title}
          postManageBarProps={{newButtons: [{url: PostPath.QUEST_EDIT, title: newPostButtonTitle}]}}
          fnFetchList={fnFetchList}
          renderPostEntries={() => <></>}
        />
      ),
      {
        user: {
          isAdmin: true,
        },
      },
    );

    expect(screen.getByText(newPostButtonTitle)).toBeInTheDocument();
  });

  it('hides post manage bar if the user is not an admin', async () => {
    const newPostButtonTitle = 'New Post';

    renderReact(
      () => (
        <PostListPage
          title={title}
          postManageBarProps={{newButtons: [{url: PostPath.QUEST_EDIT, title: newPostButtonTitle}]}}
          fnFetchList={fnFetchList}
          renderPostEntries={() => <></>}
        />
      ),
      {
        user: {
          isAdmin: false,
        },
      },
    );

    expect(screen.queryByText(newPostButtonTitle)).not.toBeInTheDocument();
  });

  it('fetches post lists on load', async () => {
    renderReact(() => (
      <PostListPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
      />
    ));

    expect(fnFetchList).toHaveBeenCalledTimes(1);
  });

  it('renders post entries if response is not empty', async () => {
    const fnRenderEntries = jest.fn();
    fnFetchList.mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      startIdx: 0,
      postCount: 2,
      posts: [{}, {}],
    });

    renderReact(() => (
      <PostListPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={fnRenderEntries}
      />
    ));

    await waitFor(() => {
      expect(fnRenderEntries).toHaveBeenCalledTimes(1);
    });
  });

  it('shows alert if failed to fetch the post list', async () => {
    fnFetchList.mockResolvedValue({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
    });

    renderReact(() => (
      <PostListPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
      />
    ));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]))).toBeInTheDocument();
    });
  });

  it('disables paginator if no items to show', async () => {
    fnFetchList.mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      startIdx: 0,
      postCount: 0,
      posts: [],
    });

    renderReact(() => (
      <PostListPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
      />
    ));

    await waitFor(() => {
      expect(screen.getByText('First').parentElement).toHaveAttribute('disabled');
      expect(screen.getByText('Previous').parentElement).toHaveAttribute('disabled');
      expect(screen.getByText('1')).toHaveAttribute('disabled');
      expect(screen.getByText('2')).toHaveAttribute('disabled');
      expect(screen.getByText('3')).toHaveAttribute('disabled');
      expect(screen.getByText('Next').parentElement).toHaveAttribute('disabled');
      expect(screen.getByText('Last').parentElement).toHaveAttribute('disabled');
    });
  });
});
