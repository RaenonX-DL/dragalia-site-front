import React from 'react';

import {Placement} from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import {OverlayBase, OverlayCommonProps} from './base';


type TooltipProps = OverlayCommonProps & {
  text: string,
  placement?: Placement,
}

export const OverlayTooltip = ({text, placement, children}: TooltipProps) => (
  <OverlayBase
    placement={placement}
    overlay={(props) => (
      <Tooltip id="button-tooltip" {...props}>
        {text}
      </Tooltip>
    )}
  >
    {children}
  </OverlayBase>
);
