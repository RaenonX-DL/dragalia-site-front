import React from 'react';
import {Modal} from 'react-bootstrap';

type Props = {
  title: string,
  message: string,
  show: boolean,
  fnHideModal: () => void
}

export const ExpressModal = ({title, message, show, fnHideModal}: Props) => {
  const onModalHidden = () => fnHideModal();

  return (
    <Modal show={show} onHide={onModalHidden}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};
