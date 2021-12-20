import React from 'react';

import {BaseModal} from './base';
import {ModalStateFlex} from './types';


type Props = {
  state: ModalStateFlex,
  setState: (state: ModalStateFlex) => void,
};

export const ModalFlexContent = ({state, setState}: Props) => {
  const onHide = () => {
    setState({...state, show: false});
  };

  return <BaseModal state={state} onHide={onHide}>{state.message}</BaseModal>;
};
