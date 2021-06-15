import React from 'react';

import {Adsense} from '@ctrl/react-adsense';

import {AdsWrapper} from './wrapper';


export const AdsInPost = () => {
  return (
    <AdsWrapper>
      <Adsense
        client="ca-pub-1535004092052078"
        slot="1322282773"
        style={{display: 'block'}}
        layout="in-article"
        format="fluid"
        data-testid="ads-in-post"
      />
    </AdsWrapper>
  );
};

export const AdsInPostList = () => {
  return (
    <AdsWrapper>
      <Adsense
        client="ca-pub-1535004092052078"
        slot="3962363338"
        style={{display: 'block'}}
        layout="in-article"
        layoutKey="-f7+5u+4t-da+6l"
        format="fluid"
        data-testid="ads-post-list"
      />
    </AdsWrapper>
  );
};
