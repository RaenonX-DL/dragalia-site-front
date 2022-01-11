import React from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';

import {ImageWithOverlay} from '../../image';
import {CheckItemProps} from '../types';
import styles from './main.module.css';


export const CheckItem = (props: CheckItemProps) => {
  const {
    text,
    variant = 'outline-secondary',
    onChange,
    image,
    groupName,
    block = false,
    ...rest
  } = props;
  const [elemId] = React.useState(`${Date.now().toString()}${text}`);

  const label = image?.url ?
    <ImageWithOverlay src={image.url} text={text} style={{height: image.height || '1.5rem'}}/> :
    <span className="text-light">{text}</span>;

  // `value` is meaningless here because the button is not grouped in `<ToggleButtonGroup>`
  // `id` is required according to the doc - `id` should be something static
  // https://react-bootstrap.github.io/components/buttons/#toggle-button-props
  return (
    <ToggleButton
      {...rest}
      variant={variant}
      name={groupName}
      onChange={(e) => onChange(e.target.checked)}
      id={elemId}
      value={text}
      style={{width: block ? '100%' : undefined}}
      className={styles['input-item']}
    >
      {label}
    </ToggleButton>
  );
};
