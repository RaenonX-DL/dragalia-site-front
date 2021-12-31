import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {SequencedPostInfo, SupportedLanguages} from '../../../../api-def/api';
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
  };
  const fakeLink = '/link';

  beforeEach(() => {
    renderPostBadges = jest.fn();
  });

  it('renders correctly', async () => {
    renderReact(() => (
      <SequencedPostEntry
        link={fakeLink}
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
