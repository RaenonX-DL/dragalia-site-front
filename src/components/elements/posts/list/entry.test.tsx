import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {PostInfo, PostType, SupportedLanguages} from '../../../../api-def/api';
import {PostPath} from '../../../../api-def/paths/const/definitions';
import {makePostUrl} from '../../../../api-def/paths/utils/make';
import {PostEntry} from './entry';


describe('Post list entry', () => {
  let renderPostBadges: jest.Mock;

  const entry: PostInfo = {
    lang: SupportedLanguages.EN,
    viewCount: 777,
    modifiedEpoch: 1000000,
    publishedEpoch: 90000,
    userSubscribed: true,
  };
  const fakeLink = makePostUrl(PostPath.MISC, {lang: SupportedLanguages.EN, pid: 7});

  beforeEach(() => {
    renderPostBadges = jest.fn();
  });

  it('renders correctly', async () => {
    renderReact(() => (
      <PostEntry
        type={PostType.MISC}
        pid={7}
        title="title"
        renderPostBadge={renderPostBadges}
        entry={entry}
      />
    ));

    // Check title existence and clickable
    const linkElement = screen.getByText('title');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', fakeLink);
    // Check view count existence
    expect(screen.getByText('', {selector: 'i.bi-eye-fill'})).toBeInTheDocument();
    // Check meta existence
    expect(screen.getByText('', {selector: 'i.bi-cloud-arrow-up'})).toBeInTheDocument();
    expect(screen.getByText('', {selector: 'i.bi-pencil-fill'})).toBeInTheDocument();
    // Check badge render
    expect(renderPostBadges).toHaveBeenCalled();
  });
});
