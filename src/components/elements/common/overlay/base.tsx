import React from 'react';

import {OverlayChildren} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayTriggerType} from 'react-bootstrap/OverlayTrigger';


export type OverlayCommonProps = {
  // Do this to require `children` to be present (React.PropsWithChildren does not require children)
  children: React.ReactElement,
}

type Props = OverlayCommonProps & {
  overlay: OverlayChildren,
  trigger?: OverlayTriggerType | Array<OverlayTriggerType>,
}

export const OverlayBase = ({
  overlay,
  trigger,
  children,
}: Props) => {
  return (
    <OverlayTrigger
      placement="auto"
      trigger={trigger}
      overlay={overlay}
    >
      {children}
    </OverlayTrigger>
  );
};
