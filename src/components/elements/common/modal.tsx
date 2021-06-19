import React from 'react';

import {Modal} from 'react-bootstrap';


export type ModalState = {
  show: boolean,
  title: string,
  message: React.ReactNode,
}

type CommonModalProps = {
  modalState: ModalState,
  setModalState: (modalState: ModalState) => void,
}

export const CommonModal = ({modalState, setModalState}: CommonModalProps) => (
  <Modal
    show={modalState.show}
    onHide={() => setModalState({show: false, title: '', message: ''})}
  >
    <Modal.Header closeButton>
      <Modal.Title>{modalState.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{modalState.message}</Modal.Body>
  </Modal>
);
