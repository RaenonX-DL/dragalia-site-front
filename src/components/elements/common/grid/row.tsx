import React from 'react';

import Row, {RowProps} from 'react-bootstrap/Row';


export const RowNoGutter = ({children, className, ...props}: React.PropsWithChildren<RowProps>) => {
  return (
    <Row className={`g-0 ${className}`} {...props}>
      {children}
    </Row>
  );
};

export const RowTight = ({children, className, ...props}: React.PropsWithChildren<RowProps>) => {
  return (
    <Row className={`g-2 ${className}`} {...props}>
      {children}
    </Row>
  );
};

export const RowRegular = ({children, className, ...props}: React.PropsWithChildren<RowProps>) => {
  return (
    <Row className={`g-3 ${className}`} {...props}>
      {children}
    </Row>
  );
};
