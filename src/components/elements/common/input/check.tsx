import React from 'react';

import Form from 'react-bootstrap/Form';

import styles from './check.module.css';


type Props = {
  label: string,
  checked: boolean,
  onChange: (newValue: boolean) => void,
};

export const FormCheck = ({label, checked, onChange}: Props) => {
  return (
    <Form.Check
      type="checkbox"
      className={styles['custom-check']}
      label={label}
      checked={checked}
      onChange={() => onChange(!checked)}
    />
  );
};
