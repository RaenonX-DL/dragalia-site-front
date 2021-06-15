import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {AdsInPost, AdsInPostList} from './main';


describe('Ads element', () => {
  it('shows post list ads', async () => {
    renderReact(
      () => (
        <AdsInPostList/>
      ),
    );

    expect(screen.queryByTestId('ads-post-list')).toBeInTheDocument();
  });

  it('hides post list ads', async () => {
    renderReact(
      () => (
        <AdsInPostList/>
      ),
      {
        user: {
          adsFreeExpiry: new Date(Date.now() + 3600),
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
    );

    expect(screen.queryByTestId('ads-in-post')).toBeInTheDocument();
  });

  it('hides in-post ads', async () => {
    renderReact(
      () => (
        <AdsInPost/>
      ),
      {
        user: {
          adsFreeExpiry: new Date(Date.now() + 3600),
        },
      },
    );

    expect(screen.queryByTestId('ads-in-post')).not.toBeInTheDocument();
  });
});
