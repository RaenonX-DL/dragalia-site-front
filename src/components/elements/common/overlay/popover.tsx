import React from 'react';

import {Popover} from 'react-bootstrap';
import {v4} from 'uuid';

import {OverlayBase, OverlayCommonProps} from './base';


type PopoverProps = OverlayCommonProps & {
  title: string,
  content: string | HTMLElement,
}

export const OverlayPopover = ({title, content, children}: PopoverProps) => (
  <OverlayBase trigger="click" overlay={(
    <Popover id={v4()}>
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{content}</Popover.Content>
    </Popover>
  )}>
    {children}
  </OverlayBase>
);
