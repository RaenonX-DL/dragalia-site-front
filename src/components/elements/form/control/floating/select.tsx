import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


import {FloatingControlCommonProps} from './type';


type Props = React.InputHTMLAttributes<HTMLSelectElement> & FloatingControlCommonProps<HTMLSelectElement>;

export const FloatingSelect = ({label, children, ...props}: React.PropsWithChildren<Props>) => {
  return (
    <FloatingLabel label={label}>
      <Form.Select {...props}>
        {children}
      </Form.Select>
    </FloatingLabel>
  );
};
