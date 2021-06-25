import React from 'react';

import Popover from 'react-bootstrap/Popover';
import {v4} from 'uuid';

import {OverlayBase, OverlayCommonProps} from './base';


type PopoverProps = OverlayCommonProps & {
  title: string,
  content: string | HTMLElement,
}

export const OverlayPopover = ({title, placement, content, children}: PopoverProps) => (
  <OverlayBase
    trigger="click"
    placement={placement}
    overlay={(
      <Popover id={v4()}>
        <Popover.Title as="h3">{title}</Popover.Title>
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    )}
  >
    {children}
  </OverlayBase>
);
