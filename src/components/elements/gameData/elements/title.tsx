import React from 'react';

import {OverlayPopover} from '../../common/overlay/popover';
import {DetailedProps} from '../../common/types';


export const SectionTitle = ({title, description}: DetailedProps) => {
  return (
    <h4>
      {title}&nbsp;
      <OverlayPopover title={title} content={description}>
        <i className="bi bi-info-circle"/>
      </OverlayPopover>
    </h4>
  );
};
