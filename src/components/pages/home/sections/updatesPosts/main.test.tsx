import React from 'react';

import {screen} from '@testing-library/react';

import {mockData} from '../../../../../../test/data/mock/homepage';
import {renderReact} from '../../../../../../test/render/main';
import {PostType, SupportedLanguages} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../const/path/definitions';
import {PostList} from './postList';


describe('Updated posts section', () => {
  it('renders 5 recently updated post', async () => {
    renderReact(() => (
      <PostList title="Updated" titlePath={GeneralPath.MISC_LIST} entries={mockData.posts[PostType.MISC]}/>
    ));

    mockData.posts[PostType.MISC].forEach((post) => expect(screen.getByText(post.title)).toBeInTheDocument());
  });

  it('redirects to the post list page', async () => {
    renderReact(() => (
      <PostList title="Updated" titlePath={GeneralPath.MISC_LIST} entries={mockData.posts[PostType.MISC]}/>
    ));

    expect(screen.getByText('Updated')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.MISC_LIST}`);
  });
});
