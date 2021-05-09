import {Fallback, TFunction} from 'react-i18next';

import {ModalState} from '../modal';

export type GoogleSignInProps = {
  t: TFunction<Fallback<string>[] | string>,
  setFailedModal: (newState: ModalState) => void,
}
