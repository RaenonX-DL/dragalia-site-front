import React from 'react';

import * as CSS from 'csstype';
import {ButtonGroup, Image, ToggleButton} from 'react-bootstrap';
import {ButtonVariant} from 'react-bootstrap/types';

import {useTranslation} from '../../../../i18n/utils';
import {OverlayTooltip} from '../../common/overlay/tooltip';
import {TitledProps} from './types';


export type InlineCheckBaseProps = TitledProps & {
  onChange: (checked: boolean) => void,
  groupName: string,
  type?: 'checkbox' | 'radio',
  variant?: ButtonVariant,
  imageUrl?: string,
  id?: string,
  checked?: boolean,
  imageHeight?: CSS.Property.Height<string | number>,
}


export const InlineCheckBase = ({
  titleLabel,
  type = 'checkbox',
  variant = 'outline-secondary',
  groupName,
  imageUrl,
  id,
  checked,
  onChange,
  imageHeight,
}: InlineCheckBaseProps) => {
  const {t} = useTranslation();

  let label;
  if (imageUrl) {
    label = (
      <OverlayTooltip text={t(titleLabel)}>
        <Image src={imageUrl} style={{height: imageHeight || '1.5rem'}}/>
      </OverlayTooltip>
    );
  } else {
    label = <span className="text-light">{t(titleLabel)}</span>;
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
        id={id || titleLabel}
        value="1"
      >
        {label}
      </ToggleButton>
    </ButtonGroup>
  );
};
