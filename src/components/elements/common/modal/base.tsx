import React from 'react';

import Modal from 'react-bootstrap/Modal';

import {ModalStateBase} from './types';


type Props = {
  state: ModalStateBase,
  onHide: () => void,
};

export const BaseModal = ({state, onHide, children}: React.PropsWithChildren<Props>) => {
  return (
    <Modal show={state.show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{state.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
