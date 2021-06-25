import React from 'react';

import {OverlayChildren, Placement} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayTriggerType} from 'react-bootstrap/OverlayTrigger';


export type OverlayCommonProps = {
  // Note that the children MUST be able to accept `ref`
  // Doc: https://react-bootstrap.github.io/components/overlays/#overlay-trigger
  children: React.ReactElement,
  placement?: Placement,
}

type Props = OverlayCommonProps & {
  overlay: OverlayChildren,
  trigger?: OverlayTriggerType | Array<OverlayTriggerType>,
}

export const OverlayBase = ({placement, trigger, overlay, children}: Props) => {
  return (
    <OverlayTrigger
      overlay={overlay}
      placement={placement}
      trigger={trigger}
    >
      {children}
    </OverlayTrigger>
  );
};
