import {EnumEntry} from '../../../api-def/resources/types/enum';
import {EnumChecksBoxProps} from '../common/check/enum/checkbox';
import {EnumRadioGroupProps} from '../common/check/enum/radio';
import {CheckboxInputProps} from '../common/check/item/checkbox';
import {RadioGroupProps} from '../common/check/types';
import {NumericInputProps} from '../common/input/numeric';
import {DetailedProps} from '../common/types';


export type InputEntryTitle = DetailedProps & {
  type: 'title',
}

export type InputEntrySubTitle = DetailedProps & {
  type: 'subTitle'
}

export type InputEntrySeparator = {
  type: 'separator'
}

export type InputEntryNumber<T> =
  DetailedProps &
  Omit<NumericInputProps<T>, keyof DetailedProps | keyof InputPanelCommonProps<T>> & {
  type: 'inputNumber'
}

export type InputEntryCheckboxGroup<T> = {
  type: 'inputCheckGroup',
  checkboxes: Array<Omit<CheckboxInputProps<T>, keyof InputPanelCommonProps<T>>>,
}

export type InputEntryRadioGroup<E, T> =
  Omit<RadioGroupProps<E, T>, keyof InputPanelCommonProps<T>> & {
  type: 'inputRadioGroup'
}

export type InputEntryEnumRadioGroup<E2 extends EnumEntry, T> =
  Omit<EnumRadioGroupProps<E2, T>, keyof InputPanelCommonProps<T>> & {
  type: 'enumRadioGroup'
}

export type InputEntryEnumCheckGroup<E2 extends EnumEntry, T> =
  Omit<EnumChecksBoxProps<E2, T>, keyof InputPanelCommonProps<T>> & {
  type: 'enumCheckGroup'
}

export type InputEntry<E, E2 extends EnumEntry, T> =
  InputEntryTitle |
  InputEntrySubTitle |
  InputEntrySeparator |
  InputEntryNumber<T> |
  InputEntryCheckboxGroup<T> |
  InputEntryRadioGroup<E, T> |
  InputEntryEnumRadioGroup<E2, T> |
  InputEntryEnumCheckGroup<E2, T>

export type InputEntries<E, E2 extends EnumEntry, T> = Array<InputEntry<E, E2, T>>

type InputPanelCommonProps<T> = {
  inputData: T,
  setInputData: (newData: T) => void,
}

export type InputEntryProps<E, E2 extends EnumEntry, T> = InputPanelCommonProps<T> & {
  inputEntry: InputEntry<E, E2, T>,
}

export type InputPanelProps<E, E2 extends EnumEntry, T> = InputPanelCommonProps<T> & {
  inputEntries: InputEntries<E, E2, T>,
}
