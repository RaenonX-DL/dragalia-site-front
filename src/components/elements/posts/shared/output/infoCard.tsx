import React from 'react';

import {Col, Row} from 'react-bootstrap';


type InfoCardProps = {
  title: string,
  content: string | number | React.ReactElement,
  useCode?: boolean
}

export const InfoCard = ({title, content, useCode = true}: InfoCardProps) => {
  return (
    <div className="p-2 rounded bg-black-32">
      <Row>
        <Col>
          <h6>{title}</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            useCode ?
              <code className="float-right h5 mb-0">{content}</code> :
              <span className="float-right h5 mb-0">{content}</span>
          }
        </Col>
      </Row>
    </div>
  );
};
