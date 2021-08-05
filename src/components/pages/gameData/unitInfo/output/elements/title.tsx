import React from 'react';


export const SectionTitle = ({children}: React.PropsWithChildren<{}>) => {
  return <h4>{children}</h4>;
};

export const SectionSubTitle = ({children}: React.PropsWithChildren<{}>) => {
  return <h5>{children}</h5>;
};
