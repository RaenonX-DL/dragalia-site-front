import React from 'react';

import {Adsense} from '@ctrl/react-adsense';

import {AdsClientId} from '../const';
import {AdsWrapper} from '../wrapper';
import {AdsUnitProps} from './types';


type Props = AdsUnitProps

export const AdsUnitMatchedContent = ({slot, testId}: Props) => (
  // About customization: https://support.google.com/adsense/answer/7533385?hl=en&ref_topic=9183242
  // This renders 1x4 in desktop, 2x2 in mobile
  <AdsWrapper>
    <Adsense
      client={AdsClientId}
      slot={slot}
      style={{display: 'block'}}
      format="autorelaxed"
      data-testid={testId}
      data-matched-content-rows-num="2,1"
      data-matched-content-columns-num="2,4"
      data-matched-content-ui-type="image_stacked,image_stacked"
    />
  </AdsWrapper>
);
