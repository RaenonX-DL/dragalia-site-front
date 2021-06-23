import React from 'react';

import * as CSS from 'csstype';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';
import {ButtonVariant} from 'react-bootstrap/types';

import {Image} from '../image';
import {TitledProps} from '../types';
import {CheckType} from './types';


export type InlineCheckBaseProps = TitledProps & {
  onChange: (checked: boolean) => void,
  groupName: string,
  type?: CheckType,
  variant?: ButtonVariant,
  imageUrl?: string,
  id?: string,
  checked?: boolean,
  imageHeight?: CSS.Property.Height,
}


export const InlineCheckBase = ({
  title,
  type = 'checkbox',
  variant = 'outline-secondary',
  groupName,
  imageUrl,
  id,
  checked,
  onChange,
  imageHeight,
}: InlineCheckBaseProps) => {
  const label = imageUrl ?
    <Image src={imageUrl} text={title} style={{height: imageHeight || '1.5rem'}}/> :
    <span className="text-light">{title}</span>;

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
        id={id || title}
        value="1"
        data-testid={id || title}
      >
        {label}
      </ToggleButton>
    </ButtonGroup>
  );
};
