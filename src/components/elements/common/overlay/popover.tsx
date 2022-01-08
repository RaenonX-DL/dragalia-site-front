import React from 'react';

import Popover from 'react-bootstrap/Popover';
import {v4} from 'uuid';

import {OverlayBase, OverlayCommonProps} from './base';


type PopoverProps = OverlayCommonProps & {
  title: string,
  content: string | React.ReactElement,
};

export const OverlayPopover = ({title, placement, content, children}: PopoverProps) => (
  <OverlayBase
    trigger="click"
    placement={placement}
    overlay={(
      <Popover id={v4()}>
        <Popover.Header as="h3">{title}</Popover.Header>
        <Popover.Body>{content}</Popover.Body>
      </Popover>
    )}
  >
    {children}
  </OverlayBase>
);
