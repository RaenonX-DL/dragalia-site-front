import React from 'react';

import {OverlayPopover} from '../../common/overlay/popover';
import {DetailedProps} from '../../common/types';


export const SectionSubTitle = ({title, description}: DetailedProps) => {
  return (
    <h5>
      {title}&nbsp;
      <OverlayPopover title={title} content={description}>
        <i className="bi bi-info-circle"/>
      </OverlayPopover>
    </h5>
  );
};
