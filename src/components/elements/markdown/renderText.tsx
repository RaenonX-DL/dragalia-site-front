import React from 'react';

import {ColorizedText, isStringTransformable} from './colorize';

export const renderText = (o: {value: string}) => {
  if (isStringTransformable(o.value)) {
    return <ColorizedText text={o.value}/>;
  }

  return <>{o.value}</>;
};
