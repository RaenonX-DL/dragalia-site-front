import React from 'react';

import {UnitMetaParams} from '../../../api-def/api';
import {AppReactContext} from '../../../context/app/main';
import {useNextRouter} from '../../../utils/router';


export const useUnitId = () => {
  const context = React.useContext(AppReactContext);
  const {query} = useNextRouter();

  if (!context) {
    return undefined;
  }

  // `context.params` contains the unit ID via direct visit
  // `query.id` contains the unit ID via in-site redirection
  return (context.params as UnitMetaParams).unitId || +(query.id as string);
};
