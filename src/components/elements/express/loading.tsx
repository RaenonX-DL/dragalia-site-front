import React from 'react';
import {Spinner} from 'react-bootstrap';


export const PageLoading = () => (
  <>
    <div className="d-flex justify-content-center" style={{minHeight: '100vh', alignItems: 'center'}}>
      <Spinner animation="border" variant="light" style={{minHeight: '8vh', minWidth: '8vh'}}/>
      <span className="ml-3" style={{fontSize: '8vh'}}>Loading...</span>
    </div>
  </>
);
