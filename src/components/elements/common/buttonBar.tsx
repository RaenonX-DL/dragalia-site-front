import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {ButtonVariant} from 'react-bootstrap/types';

import {useI18n} from '../../../i18n/hook';
import {pathnameRemoveLang, urlRemoveLang} from '../../../utils/path/process';


export type ButtonEntry = {
  variant: ButtonVariant,
  text: string,
} & ({
  pathname?: never,
  onClick: () => void,
} | {
  pathname: string,
  onClick?: () => void,
})

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
        {buttons.map(({variant, text, pathname, onClick}, idx) => {
          let href = undefined;
          if (pathname) {
            // Ensure pathname won't have language prepended
            pathname = pathnameRemoveLang(pathname);
            pathname = urlRemoveLang(pathname);

            href = `/${lang}${pathname}`;
          }

          return (
            <Button key={idx} variant={variant} className={buttonClassNames} href={href} onClick={onClick}>
              {text}
            </Button>
          );
        })}
      </Col>
    </Row>
  );
};
