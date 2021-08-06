import React from 'react';

import {InfoPopover} from '../common/overlay/info';
import {DetailedProps} from '../common/types';


export const SectionTitle = ({title, description}: DetailedProps) => {
  return (
    <h4>
      {title}&nbsp;
      <InfoPopover title={title} description={description}/>
    </h4>
  );
};
