import React from 'react';

import Modal from 'react-bootstrap/Modal';


export type ModalState = {
  show: boolean,
  title: string,
  message: React.ReactNode,
}

type CommonModalProps = {
  modalState: ModalState,
  setModalState: (modalState: ModalState) => void,
  clearContentOnClose?: boolean,
}

export const CommonModal = ({modalState, setModalState, clearContentOnClose = true}: CommonModalProps) => {
  const onHide = () => {
    if (clearContentOnClose) {
      setModalState({show: false, title: '', message: ''});
    } else {
      setModalState({...modalState, show: false});
    }
  };

  return (
    <Modal show={modalState.show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalState.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalState.message}</Modal.Body>
    </Modal>
  );
};
