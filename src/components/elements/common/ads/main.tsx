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

export const AdsTierResultsEnd = () => (
  <AdsUnitMatchedContent
    slot="9965305840"
    testId="ads-tier-results-end"
  />
);

export const AdsUnitKeyPointTop = () => (
  <AdsUnitDisplay
    slot="8652224172"
    testId="ads-unit-key-point-top"
  />
);

export const AdsUnitKeyPointIndexEnd = () => (
  <AdsUnitDisplay
    slot="8260507781"
    testId="ads-unit-key-point-index-end"
  />
);

export const AdsUnitKeyPointInfo = () => (
  <AdsUnitDisplay
    slot="9366061111"
    testId="ads-unit-key-point-info"
  />
);

export const AdsStory = () => (
  <AdsUnitDisplay
    slot="2966927859"
    testId="ads-story"
  />
);

export const AdsToolTop = () => (
  <AdsUnitMatchedContent
    slot="5473656757"
    testId="ads-tool-top"
  />
);

export const AdsToolBottom = () => (
  <AdsUnitDisplay
    slot="2641810984"
    testId="ads-tool-bottom"
  />
);
