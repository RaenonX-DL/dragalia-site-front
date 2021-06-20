export type TitledProps = {
  title: string,
}

export type DetailedProps = TitledProps & {
  description: string,
}

export type DelayedCheckState = {
  isChecking: boolean,
  checkTimer: NodeJS.Timeout | null,
}
