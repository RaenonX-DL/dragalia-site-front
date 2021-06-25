import React from 'react';

import Form from 'react-bootstrap/Form';


// Separating `ChecksPropsDisplay` and `ChecksProps` to avoid false positive of required HTML attribute
// occurred in `EnumChecksBox` and `EnumChecksRadio`

export type ChecksPropsDisplay<E, K extends string, V, T extends { [key in K]: V }> = {
  options: Array<E>,
  inputData: T,
  inputKey: K,
}

export type ChecksProps<E, K extends string, V, T extends { [key in K]: V }> = ChecksPropsDisplay<E, K, V, T> & {
  setInputData: (newInput: T) => void,
}


export type ChecksBaseProps<E> = {
  options: Array<E>,
  renderCheckItem: (entry: E) => React.ReactElement,
}


export const ChecksBase = <E, >({
  options,
  renderCheckItem,
}: ChecksBaseProps<E>) => {
  return (
    <Form.Group className="mb-3 text-center">
      {
        options.map((entry) => renderCheckItem(entry))
      }
    </Form.Group>
  );
};
