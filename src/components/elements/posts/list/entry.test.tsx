import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {PostInfo, SupportedLanguages} from '../../../../api-def/api';
import {PostEntry} from './entry';


describe('Post list entry', () => {
  let renderPostBadges: jest.Mock;

  const entry: PostInfo = {
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
      <PostEntry
        link={fakeLink}
        title="F7"
        renderPostBadge={renderPostBadges}
        entry={entry}
      />
    ));

    // Check title existence and clickable
    const linkElement = screen.getByText('F7');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/${SupportedLanguages.EN}${fakeLink}`);
    // Check view count existence
    // 2 because different elements are rendered under different breakpoint
    expect(screen.getAllByText('Viewed 777 times').length).toBeGreaterThan(0);
    // Check meta existence
    expect(screen.getAllByText('', {selector: 'i.bi-cloud-arrow-up'}).length).toBeGreaterThan(0);
    expect(screen.getAllByText('', {selector: 'i.bi-pencil-fill'}).length).toBeGreaterThan(0);
    // Check badge render
    expect(renderPostBadges).toHaveBeenCalled();
  });
});
