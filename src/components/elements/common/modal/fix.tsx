import React from 'react';

import {BaseModal} from './base';
import {ModalStateFix} from './types';


type Props = {
  state: ModalStateFix,
  setState: (state: ModalStateFix) => void,
  children: React.ReactNode,
};

export const ModalFixedContent = ({state, setState, children}: Props) => {
  const onHide = () => {
    setState({...state, show: false});
  };

  return <BaseModal state={state} onHide={onHide}>{children}</BaseModal>;
};
