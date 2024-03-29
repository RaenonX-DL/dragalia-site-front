import React from 'react';

import {InfoPopover} from '../common/overlay/info';
import {DetailedProps} from '../common/types';


export const SectionSubTitle = ({title, description}: DetailedProps) => {
  return (
    <h6>
      {title}&nbsp;
      <InfoPopover title={title} description={description}/>
    </h6>
  );
};
