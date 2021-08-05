import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {ButtonVariant} from 'react-bootstrap/types';

import {NextLink} from './link';


export type ButtonEntry = {
  url: string,
  variant: ButtonVariant,
  text: string,
}

export type ButtonBarProps = {
  buttons: Array<ButtonEntry>,
  bottomMarginClass?: string
}

export const ButtonBar = ({buttons, bottomMarginClass}: ButtonBarProps) => {
  const buttonClassNames = `float-right ml-2 ${bottomMarginClass ?? 'mb-3'}`;

  return (
    <Row>
      <Col>
        {
          buttons.map(({url, text, variant}, idx) => (
            <NextLink href={url} key={idx} passHref>
              <Button variant={variant} className={buttonClassNames}>
                {text}
              </Button>
            </NextLink>
          ))
        }
      </Col>
    </Row>
  );
};
