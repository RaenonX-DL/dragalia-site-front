import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {ApiResponseCode} from '../../../../api-def/api';
import {PostPath} from '../../../../api-def/paths';
import {PostLookupPage} from './page';


describe('Post list page', () => {
  const title = 'listTitle';
  let fnFetchList: jest.Mock;

  beforeEach(() => {
    fnFetchList = jest.fn().mockResolvedValue({});
  });

  it('shows correct page title', async () => {
    renderReact(() => (
      <PostLookupPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
        subKeyName="ALL_QUEST"
      />
    ));

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('shows ads', async () => {
    renderReact(() => (
      <PostLookupPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
        subKeyName="ALL_QUEST"
      />
    ));

    expect(screen.getByTestId('ads-post-list')).toBeInTheDocument();
  });

  it('shows correct post manage bars', async () => {
    const newPostButtonTitle = 'New Post';

    renderReact(
      () => (
        <PostLookupPage
          title={title}
          postManageBarProps={{newButtons: [{pathname: PostPath.QUEST_EDIT, title: newPostButtonTitle}]}}
          fnFetchList={fnFetchList}
          renderPostEntries={() => <></>}
          subKeyName="ALL_QUEST"
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
        <PostLookupPage
          title={title}
          postManageBarProps={{newButtons: [{pathname: PostPath.QUEST_EDIT, title: newPostButtonTitle}]}}
          fnFetchList={fnFetchList}
          renderPostEntries={() => <></>}
          subKeyName="ALL_QUEST"
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
      <PostLookupPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
        subKeyName="ALL_QUEST"
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
      <PostLookupPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={fnRenderEntries}
        subKeyName="ALL_QUEST"
      />
    ));

    await waitFor(() => expect(fnRenderEntries).toHaveBeenCalledTimes(1));
  });

  it('shows alert if failed to fetch the post list', async () => {
    fnFetchList.mockResolvedValue({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
    });

    renderReact(() => (
      <PostLookupPage
        title={title}
        postManageBarProps={{newButtons: []}}
        fnFetchList={fnFetchList}
        renderPostEntries={() => <></>}
        subKeyName="ALL_QUEST"
      />
    ));

    const errorRegex = new RegExp(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]);
    await waitFor(() => expect(screen.getByText(errorRegex)).toBeInTheDocument());
  });
});
