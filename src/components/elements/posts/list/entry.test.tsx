import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {SequencedPostInfo, SupportedLanguages} from '../../../../api-def/api';
import {PostEntry, PostEntryBadgeProps} from './entry';


describe('Post list entry', () => {
  let generateLink: jest.Mock<string, [number]>;
  let renderPostBadges: jest.Mock<React.ReactElement, [PostEntryBadgeProps<SequencedPostInfo>]>;

  const entry: SequencedPostInfo = {
    seqId: 7,
    title: 'title 7',
    lang: SupportedLanguages.EN,
    viewCount: 777,
    modifiedEpoch: 1000000,
    publishedEpoch: 90000,
  };
  const fakeLink = '/link';

  beforeEach(() => {
    generateLink = jest.fn().mockImplementation(() => fakeLink);
    renderPostBadges = jest.fn();
  });

  it('renders correctly', async () => {
    renderReact(() => (
      <PostEntry
        generateLink={generateLink}
        renderPostBadge={renderPostBadges}
        entry={entry}
      />
    ));

    // Check title existence and clickable
    const linkElement = screen.getByText('title 7');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/${SupportedLanguages.EN}${fakeLink}`);
    // Check view count existence
    expect(screen.getByText('Viewed 777 times')).toBeInTheDocument();
    // Check meta existence
    expect(screen.getByText('', {selector: 'i.bi-cloud-arrow-up'})).toBeInTheDocument();
    expect(screen.getByText('', {selector: 'i.bi-pencil-fill'})).toBeInTheDocument();
  });
});
