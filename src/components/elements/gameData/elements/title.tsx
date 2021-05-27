import React from 'react';

import {OverlayPopover} from '../../common/overlay/popover';
import {DetailedProps} from '../../common/types';

export const SectionTitle = ({title, description}: DetailedProps) => {
  return (
    <OverlayPopover title={title} content={description}>
      <h4 className="mb-3">{title}</h4>
    </OverlayPopover>
  );
};
