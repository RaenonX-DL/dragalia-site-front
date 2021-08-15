import * as CSS from 'csstype';
import {ButtonVariant} from 'react-bootstrap/types';

import {InputProps, ReadonlyInputProps} from '../types';


export type CheckOption = {
  text: string,
}

export type ChecksPropsReadonly<E, T, V> = ReadonlyInputProps<T, V> & {
  options: Array<E>,
}

export type CheckItemImageOptions = {
  height?: CSS.Property.Height,
  url?: string,
}

export type CheckItemProps = {
  text: string,
  variant?: ButtonVariant,
  checked?: boolean,
  onChange: (checked: boolean) => void,
  image?: CheckItemImageOptions,
  disabled?: boolean,
} & ({
  type: 'radio',
  groupName: string,
} | {
  type: 'checkbox',
  groupName?: never,
})

export type CheckGroupProps<E, T, V, V2 = V> =
  ChecksPropsReadonly<E, T, V2> &
  InputProps<T, V2> & {
  getCheckOptionComparer: (option: E) => V,
  getImageUrl?: (option: E) => CheckItemImageOptions['url'],
  imageHeight?: CheckItemImageOptions['height'],
}

// `V` needs to be explicit or the type inference will fail
export type RadioGroupProps<E, T> = CheckGroupProps<E, T, number> & {
  groupName: string,
}

// `V` needs to be explicit or the type inference will fail
export type CheckboxGroupProps<E, T> = CheckGroupProps<E, T, number, Array<number>>
