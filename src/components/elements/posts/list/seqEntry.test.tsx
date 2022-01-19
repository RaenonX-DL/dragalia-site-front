import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {PostType, SequencedPostInfo, SupportedLanguages} from '../../../../api-def/api';
import {PostPath} from '../../../../api-def/paths/const/definitions';
import {makePostUrl} from '../../../../api-def/paths/utils/make';
import {SequencedPostEntry} from './seqEntry';
import {PostEntryBadgeProps} from './types';


describe('Sequenced post list entry', () => {
  let renderPostBadges: jest.Mock<React.ReactElement, [PostEntryBadgeProps<SequencedPostInfo>]>;

  const entry: SequencedPostInfo = {
    seqId: 7,
    title: 'title 7',
    lang: SupportedLanguages.EN,
    viewCount: 777,
    modifiedEpoch: 1000000,
    publishedEpoch: 90000,
    userSubscribed: true,
  };
  const fakeLink = makePostUrl(PostPath.ANALYSIS, {lang: SupportedLanguages.EN, pid: 7});

  beforeEach(() => {
    renderPostBadges = jest.fn();
  });

  it('renders correctly', async () => {
    renderReact(() => (
      <SequencedPostEntry
        type={PostType.ANALYSIS}
        renderPostBadge={renderPostBadges}
        entry={entry}
      />
    ));

    // Check title existence and clickable
    const linkElement = screen.getByText('title 7');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', fakeLink);
    // Check view count existence
    expect(screen.getByText('', {selector: 'i.bi-eye-fill'})).toBeInTheDocument();
    // Check meta existence
    expect(screen.getByText('', {selector: 'i.bi-cloud-arrow-up'})).toBeInTheDocument();
    expect(screen.getByText('', {selector: 'i.bi-pencil-fill'})).toBeInTheDocument();
  });
});
