import React from 'react';

import Tooltip from 'react-bootstrap/Tooltip';

import {OverlayBase, OverlayCommonProps} from './base';


type TooltipProps = OverlayCommonProps & {
  text: string,
}

export const OverlayTooltip = ({text, children}: TooltipProps) => (
  <OverlayBase
    overlay={(props) => (
      <Tooltip id="button-tooltip" {...props}>
        {text}
      </Tooltip>
    )}
  >
    {children}
  </OverlayBase>
);
