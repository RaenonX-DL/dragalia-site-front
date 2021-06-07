import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {AdsInPost, AdsInPostList} from './ads';


describe('Ads element', () => {
  it('shows post list ads', async () => {
    renderReact(
      () => (
        <AdsInPostList/>
      ),
      {
        context: {
          showAds: true,
        },
      },
    );

    expect(screen.queryByTestId('ads-post-list')).toBeInTheDocument();
  });

  it('hides post list ads', async () => {
    renderReact(
      () => (
        <AdsInPostList/>
      ),
      {
        context: {
          showAds: false,
        },
      },
    );

    expect(screen.queryByTestId('ads-post-list')).not.toBeInTheDocument();
  });

  it('shows in-post ads', async () => {
    renderReact(
      () => (
        <AdsInPost/>
      ),
      {
        context: {
          showAds: true,
        },
      },
    );

    expect(screen.queryByTestId('ads-in-post')).toBeInTheDocument();
  });

  it('hides in-post ads', async () => {
    renderReact(
      () => (
        <AdsInPost/>
      ),
      {
        context: {
          showAds: false,
        },
      },
    );

    expect(screen.queryByTestId('ads-in-post')).not.toBeInTheDocument();
  });
});
