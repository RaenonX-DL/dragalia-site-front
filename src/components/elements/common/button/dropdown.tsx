import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import BsDropdownButton from 'react-bootstrap/DropdownButton';
import {ButtonVariant} from 'react-bootstrap/types';


type Props<E> = {
  title: string,
  variant: ButtonVariant,
  options: E[],
  isActive: (element: E) => boolean,
  onClick: (element: E) => void,
  getOptionText: (element: E) => string,
};

export const DropdownButton = <E, >({title, variant, options, onClick, isActive, getOptionText}: Props<E>) => {
  return (
    <BsDropdownButton title={title} variant={variant} menuVariant="dark">
      {options.map((option, idx) => (
        <Dropdown.Item
          key={idx}
          onClick={() => onClick(option)}
          active={isActive(option)}
        >
          {getOptionText(option)}
        </Dropdown.Item>
      ))}
    </BsDropdownButton>
  );
};
