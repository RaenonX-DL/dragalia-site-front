import React from 'react';

import {BaseModal} from './base';
import {ModalStateMapped} from './types';


type Props<K extends string> = {
  state: ModalStateMapped<K>,
  setState: (state: ModalStateMapped<K>) => void,
  lookup: { [key in K]: React.ReactNode },
}

export const ModalMappedContent = <K extends string>({state, setState, lookup}: Props<K>) => {
  const onHide = () => {
    setState({...state, show: false});
  };

  return <BaseModal state={state} onHide={onHide}>{lookup[state.key]}</BaseModal>;
};
