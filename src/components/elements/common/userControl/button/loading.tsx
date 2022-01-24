import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


export const AuthLoadingButton = () => {
  return (
    <Button variant="outline-light" className="bg-gradient" disabled>
      <Spinner animation="grow"/>
    </Button>
  );
};
