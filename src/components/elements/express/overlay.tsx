import React from 'react';
import {OverlayTrigger, Popover, Tooltip} from 'react-bootstrap';
import {v4} from 'uuid';


type TooltipProps = {
  text: string,
  children: React.ReactElement
}


export const OverlayTooltip = ({text, children}: TooltipProps) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="auto" overlay={renderTooltip}>
      {children}
    </OverlayTrigger>
  );
};


type PopoverProps = {
  title: string,
  content: string | HTMLElement,
  children: React.ReactElement
}


export const OverlayPopover = ({title, content, children}: PopoverProps) => {
  const popover = (
    <Popover id={v4()}>
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{content}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
      {children}
    </OverlayTrigger>
  );
};
