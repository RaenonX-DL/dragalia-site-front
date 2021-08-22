import React from 'react';

import {Adsense} from '@ctrl/react-adsense';

import {AdsClientId} from '../const';
import {AdsWrapper} from '../wrapper';
import {AdsUnitProps} from './types';


type Props = AdsUnitProps

export const AdsUnitMatchedContent = ({slot, testId, style}: Props) => (
  <AdsWrapper>
    <Adsense
      client={AdsClientId}
      slot={slot}
      style={{...style, display: 'block'}}
      format="autorelaxed"
      data-testid={testId}
    />
  </AdsWrapper>
);
