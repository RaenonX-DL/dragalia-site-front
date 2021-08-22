import React from 'react';

import {Adsense} from '@ctrl/react-adsense';

import {AdsClientId} from '../const';
import {AdsWrapper} from '../wrapper';
import {AdsUnitProps} from './types';


type Props = AdsUnitProps & {
  layoutKey: string,
}

export const AdsUnitInFeed = ({slot, layoutKey, testId, style}: Props) => (
  <AdsWrapper>
    <Adsense
      client={AdsClientId}
      slot={slot}
      style={{...style, display: 'block'}}
      layoutKey={layoutKey}
      format="fluid"
      data-testid={testId}
    />
  </AdsWrapper>
);
