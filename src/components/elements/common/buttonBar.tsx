import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {ButtonVariant} from 'react-bootstrap/types';

import {useI18n} from '../../../i18n/hook';
import {pathnameRemoveLang, urlRemoveLang} from '../../../utils/path/process';


export type ButtonEntry = {
  pathname: string,
  variant: ButtonVariant,
  text: string,
}

export type ButtonBarProps = {
  buttons: Array<ButtonEntry>,
  bottomMarginClass?: string
}

export const ButtonBar = ({buttons, bottomMarginClass}: ButtonBarProps) => {
  const {lang} = useI18n();

  const buttonClassNames = `float-right ml-2 ${bottomMarginClass ?? 'mb-3'}`;

  return (
    <Row>
      <Col>
        {buttons.map(({pathname, text, variant}, idx) => {
          // Ensure pathname won't have language prepended
          pathname = pathnameRemoveLang(pathname);
          pathname = urlRemoveLang(pathname);

          return (
            <Button variant={variant} className={buttonClassNames} href={`/${lang}${pathname}`} key={idx}>
              {text}
            </Button>
          );
        })}
      </Col>
    </Row>
  );
};
