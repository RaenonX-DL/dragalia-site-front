import React from 'react';

import {OverlayPopover} from '../../common/overlay/popover';
import {DetailedProps} from '../../common/types';

export const SectionSubTitle = ({title, description}: DetailedProps) => {
  return (
    <OverlayPopover title={title} content={description}>
      <h5 className="mb-3">{title}</h5>
    </OverlayPopover>
  );
};
