import {ProgressBarProps} from 'react-bootstrap/ProgressBar';

import {EnumEntry} from '../../../../api-def/resources';
import {EnumChecksBoxProps} from '../../common/check/enum/checkbox';
import {EnumRadioGroupProps} from '../../common/check/enum/radio';
import {CheckboxGroupProps, RadioGroupProps} from '../../common/check/types';
import {NumericInputProps} from '../../common/input/numeric';
import {DetailedProps, InputPropsExtended} from '../../common/types';


export type InputEntryTitle = DetailedProps & {
  type: 'title',
};

export type InputEntrySubTitle = DetailedProps & {
  type: 'subTitle'
};

export type InputEntrySeparator = {
  type: 'separator'
};

export type InputEntryNumber<T> = DetailedProps & Omit<
  NumericInputProps<T>,
  keyof DetailedProps | keyof InputPanelCommonProps<T>
> & {
  type: 'inputNumber'
};

export type InputEntryCheckGroup<E, T, V> = Omit<
  CheckboxGroupProps<E, T, V>,
  keyof InputPanelCommonProps<T>
> & {
  type: 'inputCheckGroup',
};

export type InputEntryRadioGroup<E, T, V> = Omit<
  RadioGroupProps<E, T, V>,
  keyof InputPanelCommonProps<T>
> & {
  type: 'inputRadioGroup'
};

export type InputEntryIndividualCheckOption<T> = Omit<
  InputPropsExtended<T, boolean>,
  keyof InputPanelCommonProps<T>
> & {
  text: string,
  disabled?: boolean,
  block?: boolean,
};

export type InputEntryIndividualCheckGroup<T> = {
  type: 'individualCheckGroup',
  checkboxes: InputEntryIndividualCheckOption<T>[],
};

export type InputEntryEnumRadioGroup<E2 extends EnumEntry, T> = Omit<
  EnumRadioGroupProps<E2, T>,
  keyof InputPanelCommonProps<T>
> & {
  type: 'enumRadioGroup'
};

export type InputEntryEnumCheckGroup<E2 extends EnumEntry, T> = Omit<
  EnumChecksBoxProps<E2, T>,
  keyof InputPanelCommonProps<T>
> & {
  type: 'enumCheckGroup'
};

export type InputEntrySelect<E, T> = {
  type: 'select',
  title: string,
  defaultEntry: E,
  values: Array<E>,
  getUpdatedInputData: (selected: string) => T,
  getValue: (entry: E) => string,
  getText?: (entry: E) => string,
};

export type InputEntryProgressBar = {
  type: 'progress',
  value: number,
  variant: ProgressBarProps['variant'],
};

export type InputEntry<E, E2 extends EnumEntry, T, V> =
  InputEntryTitle |
  InputEntrySubTitle |
  InputEntrySeparator |
  InputEntryNumber<T> |
  InputEntryIndividualCheckGroup<T> |
  InputEntryCheckGroup<E, T, V> |
  InputEntryRadioGroup<E, T, V> |
  InputEntryEnumRadioGroup<E2, T> |
  InputEntryEnumCheckGroup<E2, T> |
  InputEntrySelect<E, T> |
  InputEntryProgressBar;

export type InputEntries<E, E2 extends EnumEntry, T, V> = Array<InputEntry<E, E2, T, V>>;

export type InputPanelCommonProps<T> = {
  inputData: T,
  setInputData: (newData: T) => void,
};

export type InputEntryProps<E, E2 extends EnumEntry, T, V> = InputPanelCommonProps<T> & {
  inputEntry: InputEntry<E, E2, T, V>,
};

export type InputPanelProps<E, E2 extends EnumEntry, T, V> = InputPanelCommonProps<T> & {
  inputEntries: InputEntries<E, E2, T, V>,
};
