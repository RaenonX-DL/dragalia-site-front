import React from 'react';

import {Adsense} from '@ctrl/react-adsense';

import {AdsClientId} from '../const';
import {AdsWrapper} from '../wrapper';
import {AdsUnitProps} from './types';


type Props = AdsUnitProps

export const AdsUnitInArticle = ({slot, testId}: Props) => (
  <AdsWrapper>
    <Adsense
      client={AdsClientId}
      slot={slot}
      style={{display: 'block', textAlign: 'center'}}
      layout="in-article"
      format="fluid"
      data-testid={testId}
    />
  </AdsWrapper>
);
