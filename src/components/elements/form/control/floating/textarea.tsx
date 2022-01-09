import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from './textarea.module.css';
import {FloatingControlCommonProps} from './type';


type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & FloatingControlCommonProps<HTMLTextAreaElement>;

export const FloatingTextarea = ({label, rows, ...props}: Props) => {
  // `placeholder` is not displayed here, but it's required for the floating label to work
  // `placeholder` also needs a non-zero-length value or the animation won't be displayed
  return (
    <FloatingLabel
      label={label}
      className={`${styles['label-overlap-fix']} ${props.disabled ? styles['label-overlap-fix-disabled'] : ''}`}
    >
      <Form.Control
        {...props}
        placeholder=" "
        as="textarea"
        style={{height: `calc(3.5rem + 1rem * ${rows})`}}
      />
    </FloatingLabel>
  );
};
