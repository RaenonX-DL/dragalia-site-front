import React from 'react';

import {AdsUnitDisplay} from './unit/display';
import {AdsUnitInArticle} from './unit/inArticle';
import {AdsUnitInFeed} from './unit/inFeed';
import {AdsUnitMatchedContent} from './unit/matched';


export const AdsInPost = () => (
  <AdsUnitInArticle
    slot="1322282773"
    testId="ads-in-post"
  />
);

export const AdsPostList = () => (
  <AdsUnitInFeed
    slot="3962363338"
    layoutKey="-f7+5u+4t-da+6l"
    testId="ads-post-list"
  />
);

export const AdsPageTop = () => (
  <AdsUnitMatchedContent
    slot="4904550853"
    testId="ads-page-top"
  />
);

export const AdsUnitSearchBottom = () => (
  <AdsUnitDisplay
    slot="4716848598"
    testId="ads-unit-search-bottom"
  />
);
