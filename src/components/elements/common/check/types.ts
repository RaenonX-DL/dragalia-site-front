import * as CSS from 'csstype';
import {ButtonVariant} from 'react-bootstrap/types';

import {InputPropsExtended} from '../types';


export type CheckOption = {
  text: string,
};

export type CheckItemImageOptions = {
  height?: CSS.Property.Height,
  url?: string,
};

export type CheckItemProps = {
  text: string,
  onChange: (checked: boolean) => void,
  checked: boolean,
  variant?: ButtonVariant,
  image?: CheckItemImageOptions,
  disabled?: boolean,
} & ({
  type: 'radio',
  groupName: string,
} | {
  type: 'checkbox',
  groupName?: never,
});

export type CheckGroupProps<E, T, VO, VI> = InputPropsExtended<T, VI> & {
  options: Array<E>,
  getValueOfOption: (option: E) => VO,
  getImageUrl?: (option: E) => CheckItemImageOptions['url'],
  imageHeight?: CheckItemImageOptions['height'],
};

export type RadioGroupProps<E, T, V> = CheckGroupProps<E, T, V, V> & {
  groupName: string,
};

export type CheckboxGroupProps<E, T, V> = CheckGroupProps<E, T, V, Array<V>>;
