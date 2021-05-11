export type InputProps<K extends string, V, T extends { [key in K]: V }> = {
  inputData: T,
  inputKey: K,
  setInputData: (newInput: T) => void,
}
