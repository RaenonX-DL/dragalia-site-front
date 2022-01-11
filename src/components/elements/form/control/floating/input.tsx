import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {FloatingControlCommonProps} from './type';


type Props = React.InputHTMLAttributes<HTMLInputElement> & FloatingControlCommonProps<HTMLInputElement>;

export const FloatingInput = ({label, ...props}: Props) => {
  // `placeholder` is not displayed here, but it's required for the floating label to work
  // `placeholder` also needs a non-zero-length value or the animation won't be displayed
  return (
    <FloatingLabel label={label}>
      <Form.Control
        {...props}
        placeholder=" "
      />
    </FloatingLabel>
  );
};
