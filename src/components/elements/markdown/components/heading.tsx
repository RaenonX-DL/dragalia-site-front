import React from 'react';

import {HeadingComponent} from 'react-markdown/src/ast-to-react';

import {TextChildren} from '../transformers/text/main';


export const renderHeading: HeadingComponent = ({children, level}) => {
  const Text = () => (
    <TextChildren>
      {children}
    </TextChildren>
  );

  if (level === 1) {
    return <h1><Text/></h1>;
  }
  if (level === 2) {
    return <h2><Text/></h2>;
  }
  if (level === 3) {
    return <h3><Text/></h3>;
  }
  if (level === 4) {
    return <h4><Text/></h4>;
  }
  if (level === 5) {
    return <h5><Text/></h5>;
  }
  if (level === 6) {
    return <h6><Text/></h6>;
  }

  return <Text/>;
};
