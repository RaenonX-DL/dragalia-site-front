import React from 'react';

import {Adsense} from '@ctrl/react-adsense';

export const AdsInPost = () => (
  <div className="mb-3">
    <Adsense
      client="ca-pub-1535004092052078"
      slot="1322282773"
      style={{display: 'block'}}
      layout="in-article"
      format="fluid"
    />
  </div>
);

export const AdsInPostList = () => (
  <div className="mb-3">
    <Adsense
      client="ca-pub-1535004092052078"
      slot="3962363338"
      style={{display: 'block'}}
      layout="in-article"
      layoutKey="-f7+5u+4t-da+6l"
      format="fluid"
    />
  </div>
);
