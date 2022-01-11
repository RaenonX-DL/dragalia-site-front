import React from 'react';

import {OverlayChildren} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayTriggerType} from 'react-bootstrap/OverlayTrigger';
import {Placement} from 'react-bootstrap/types';


export type OverlayCommonProps = {
  // Note that the children MUST be able to accept `ref`
  // Doc: https://react-bootstrap.github.io/components/overlays/#overlay-trigger
  children: React.ReactElement,
  placement?: Placement,
};

type Props = OverlayCommonProps & {
  overlay: OverlayChildren,
  trigger?: OverlayTriggerType | Array<OverlayTriggerType>,
};

export const OverlayBase = ({placement, trigger, overlay, children}: Props) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={overlay}
      trigger={trigger}
    >
      {children}
    </OverlayTrigger>
  );
};
