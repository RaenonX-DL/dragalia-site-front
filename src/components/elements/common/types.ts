export type TitledProps = {
  title: string,
}

export type DetailedProps = TitledProps & {
  description: string,
}

export type ReadonlyInputProps<T, V> = {
  inputData: T,
  getValue: (inputData: T) => V,
}

export type InputProps<T, V> = ReadonlyInputProps<T, V> & {
  setInputData: (newInput: T) => void,
  getUpdatedInputData: (newValue: V) => T,
}

export type DelayedCheckState = {
  isChecking: boolean,
  checkTimer: NodeJS.Timeout | null,
}
