import React, {Dispatch, SetStateAction} from 'react';
import {Modal} from 'react-bootstrap';

type Props = {
  title: string,
  message: string,
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>
}

export const ExpressModal = ({title, message, show, setShow}: Props) => {
  const onModalHidden = () => setShow(false);

  return (
    <Modal show={show} onHide={onModalHidden}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};
