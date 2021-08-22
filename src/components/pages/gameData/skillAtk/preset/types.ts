import {ModalStateFlex} from '../../../../elements/common/modal/types';


export type PresetStatus =
  'notCreated' |
  'creating' |
  'copied' |
  'createdNotCopied';

export type PresetState = {
  status: PresetStatus,
  link: string,
  modal: ModalStateFlex,
}
