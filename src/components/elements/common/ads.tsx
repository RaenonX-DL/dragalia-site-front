import React, {useContext} from 'react';

import {Adsense} from '@ctrl/react-adsense';

import {AppReactContext} from '../../../context/app/main';


export const AdsInPost = () => {
  const context = useContext(AppReactContext);

  if (context && !context.showAds) {
    return <></>;
  }

  return (
    <div className="mb-3">
      <Adsense
        client="ca-pub-1535004092052078"
        slot="1322282773"
        style={{display: 'block'}}
        layout="in-article"
        format="fluid"
        data-testid="ads-in-post"
      />
    </div>
  );
};

export const AdsInPostList = () => {
  const context = useContext(AppReactContext);

  if (context && !context.showAds) {
    return <></>;
  }

  return (
    <div className="mb-3">
      <Adsense
        client="ca-pub-1535004092052078"
        slot="3962363338"
        style={{display: 'block'}}
        layout="in-article"
        layoutKey="-f7+5u+4t-da+6l"
        format="fluid"
        data-testid="ads-post-list"
      />
    </div>
  );
};
