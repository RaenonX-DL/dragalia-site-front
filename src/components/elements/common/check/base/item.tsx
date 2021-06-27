import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import {ImageWithOverlay} from '../../image';
import {CheckItemProps} from '../types';


export const CheckItem = ({
  text,
  variant = 'outline-secondary',
  checked,
  onChange,
  image,
  type,
  groupName,
}: CheckItemProps) => {
  const label = image?.url ?
    <ImageWithOverlay src={image.url} text={text} style={{height: image.height || '1.5rem'}}/> :
    <span className="text-light">{text}</span>;

  // Value of `1` is the identifier of that button in a button group.
  // https://react-bootstrap.github.io/components/buttons/#toggle-button-props
  return (
    <ButtonGroup toggle className="m-1">
      <ToggleButton
        type={type}
        variant={variant}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        name={groupName}
        value="1"
      >
        {label}
      </ToggleButton>
    </ButtonGroup>
  );
};
