import React from 'react';

import {NavItemReactComponent} from '../type';


type Props = NavItemReactComponent;

export const NavComponent = ({renderComponent}: Props) => {
  return (
    <React.Fragment>
      {renderComponent()}
    </React.Fragment>
  );
};
