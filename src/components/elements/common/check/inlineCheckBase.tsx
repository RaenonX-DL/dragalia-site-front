import React from 'react';

import * as CSS from 'csstype';
import {ButtonGroup, Image, ToggleButton} from 'react-bootstrap';
import {ButtonVariant} from 'react-bootstrap/types';

import {OverlayTooltip} from '../overlay/tooltip';
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
  imageHeight?: CSS.Property.Height<string | number>,
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
  let label;
  if (imageUrl) {
    label = (
      <OverlayTooltip text={title}>
        <Image src={imageUrl} alt={id} style={{height: imageHeight || '1.5rem'}}/>
      </OverlayTooltip>
    );
  } else {
    label = <span className="text-light">{title}</span>;
  }

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
