import React from 'react';

import {OverlayChildren, Placement} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayTriggerType} from 'react-bootstrap/OverlayTrigger';


export type OverlayCommonProps = {
  // Do this to require `children` to be present (React.PropsWithChildren does not require children)
  children: React.ReactElement,
}

type Props = OverlayCommonProps & {
  overlay: OverlayChildren,
  placement?: Placement,
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
