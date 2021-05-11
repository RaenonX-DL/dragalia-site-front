export type DelayedCheckState = {
  isChecking: boolean,
  checkTimer: NodeJS.Timeout | null,
}
