import React from 'react';

import {FormControlProps} from 'react-bootstrap/FormControl';


export type FloatingControlCommonProps<T> = Omit<FormControlProps, 'onChange'> & {
  label: React.ReactNode,
  onChange?: React.ChangeEventHandler<T>,
};
