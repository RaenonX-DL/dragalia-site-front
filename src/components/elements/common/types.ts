export type TitledProps = {
  title: string,
}

export type DetailedProps = TitledProps & {
  description: string,
}

export type InputProps<T> = {
  inputData: T,
  setInputData: (newInput: T) => void,
}

export type InputPropsExtended<T, V> = InputProps<T> & {
  getValue: (inputData: T) => V,
  getUpdatedInputData: (newValue: V) => T,
}

export type DelayedCheckState = {
  isChecking: boolean,
  checkTimer: NodeJS.Timeout | null,
}
