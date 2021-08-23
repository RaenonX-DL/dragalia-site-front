import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {AdsUnitDisplay} from './unit/display';
import {AdsUnitInArticle} from './unit/inArticle';
import {AdsUnitInFeed} from './unit/inFeed';
import {AdsUnitMatchedContent} from './unit/matched';


describe('Ads unit element', () => {
  it('shows display ads', async () => {
    renderReact(() => <AdsUnitDisplay slot="1" testId="adsDisplay"/>);

    expect(screen.queryByTestId('adsDisplay')).toBeInTheDocument();
  });

  it('hides display ads', async () => {
    renderReact(
      () => <AdsUnitDisplay slot="1" testId="adsDisplay"/>,
      {user: {adsFreeExpiry: new Date(Date.now() + 3600)}},
    );

    expect(screen.queryByTestId('adsDisplay')).not.toBeInTheDocument();
  });

  it('shows in-article ads', async () => {
    renderReact(() => <AdsUnitInArticle slot="1" testId="adsInArticle"/>);

    expect(screen.queryByTestId('adsInArticle')).toBeInTheDocument();
  });

  it('hides in-article ads', async () => {
    renderReact(
      () => <AdsUnitInArticle slot="1" testId="adsInArticle"/>,
      {user: {adsFreeExpiry: new Date(Date.now() + 3600)}},
    );

    expect(screen.queryByTestId('adsInArticle')).not.toBeInTheDocument();
  });

  it('shows in-feed ads', async () => {
    renderReact(() => <AdsUnitInFeed slot="1" layoutKey="a" testId="adsInFeed"/>);

    expect(screen.queryByTestId('adsInFeed')).toBeInTheDocument();
  });

  it('hides in-feed ads', async () => {
    renderReact(
      () => <AdsUnitInFeed slot="1" layoutKey="a" testId="adsInFeed"/>,
      {user: {adsFreeExpiry: new Date(Date.now() + 3600)}},
    );

    expect(screen.queryByTestId('adsInFeed')).not.toBeInTheDocument();
  });

  it('shows matched content ads', async () => {
    renderReact(() => <AdsUnitMatchedContent slot="1" testId="adsMatched"/>);

    expect(screen.queryByTestId('adsMatched')).toBeInTheDocument();
  });

  it('hides matched content ads', async () => {
    renderReact(
      () => <AdsUnitMatchedContent slot="1" testId="adsMatched"/>,
      {user: {adsFreeExpiry: new Date(Date.now() + 3600)}},
    );

    expect(screen.queryByTestId('adsMatched')).not.toBeInTheDocument();
  });
});
