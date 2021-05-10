import {TFunction} from '../../../../i18n/types';
import {ModalState} from '../modal';

export type FailureInfo = ModalState;

export type GoogleSignInProps = {
  t: TFunction,
  onFailed: (failureInfo: FailureInfo) => void,
}
