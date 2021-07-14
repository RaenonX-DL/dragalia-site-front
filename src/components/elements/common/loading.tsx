import React from 'react';

import Spinner from 'react-bootstrap/Spinner';


export const Loading = () => {
  return (
    <div className="text-center">
      <Spinner animation="grow"/>&nbsp;
      <span className="h3">Loading...</span>
    </div>
  );
};
