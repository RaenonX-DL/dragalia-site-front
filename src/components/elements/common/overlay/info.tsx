import React from 'react';

import {DetailedProps} from '../types';
import {OverlayPopover} from './popover';


export const InfoPopover = ({title, description}: DetailedProps) => {
  return (
    <OverlayPopover title={title} content={description}>
      <i className="bi bi-info-circle"/>
    </OverlayPopover>
  );
};
