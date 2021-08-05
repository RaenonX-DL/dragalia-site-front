import {ModalState} from '../../../../elements/common/modal';


export type PresetStatus =
  'notCreated' |
  'creating' |
  'copied' |
  'createdNotCopied';

export type PresetState = {
  status: PresetStatus,
  link: string,
  modal: ModalState,
}
