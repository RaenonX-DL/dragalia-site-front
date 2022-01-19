import React from 'react';

import {screen} from '@testing-library/react';

import {mockData} from '../../../../../../test/data/mock/homepage';
import {renderReact} from '../../../../../../test/render/main';
import {PostType, SupportedLanguages} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {PostList} from './postList';


describe('Updated posts section', () => {
  it('renders 5 recently updated post', async () => {
    renderReact(() => (
      <PostList
        title="Updated"
        titlePath={GeneralPath.MISC_LIST}
        entries={mockData.posts[PostType.MISC]}
        defaultSubscribed
        subscriptionKey={{type: 'const', name: 'ALL_MISC'}}
      />
    ));

    mockData.posts[PostType.MISC].forEach((post) => expect(screen.getByText(post.title)).toBeInTheDocument());
  });

  it('redirects to the post list page', async () => {
    renderReact(() => (
      <PostList
        title="Updated"
        titlePath={GeneralPath.MISC_LIST}
        entries={mockData.posts[PostType.MISC]}
        defaultSubscribed
        subscriptionKey={{type: 'const', name: 'ALL_MISC'}}
      />
    ));

    expect(screen.getByText('Updated')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.MISC_LIST}`);
  });

  it('shows current subscription status', async () => {
    renderReact(() => (
      <PostList
        defaultSubscribed
        title="Updated"
        titlePath={GeneralPath.MISC_LIST}
        entries={mockData.posts[PostType.MISC]}
        subscriptionKey={{type: 'const', name: 'ALL_MISC'}}
      />
    ));

    // 1 for global, 4 for individual
    expect(screen.getAllByText('', {selector: 'i.bi-bell'})).toHaveLength(5);
    expect(screen.getAllByText('', {selector: 'i.bi-bell-slash'})).toHaveLength(1);
  });
});
