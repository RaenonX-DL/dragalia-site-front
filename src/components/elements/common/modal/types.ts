export type ModalStateBase = {
  show: boolean,
  title: string,
}

export type ModalStateFix = ModalStateBase

export type ModalStateFlex = ModalStateBase & {
  message: string,
}

export type ModalStateMapped<K extends string> = ModalStateBase & {
  key: K
}
