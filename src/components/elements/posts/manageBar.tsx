import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PagePath} from '../../../const/path/definitions';
import {useI18n} from '../../../i18n/hook';
import {NextLink} from '../common/link';


type NewButtonEntry = {
  url: PagePath,
  title?: string,
}

export type PostManageBarProps = {
  newButtons: Array<NewButtonEntry>,
  editPostUrl?: string
}

export const PostManageBar = ({newButtons, editPostUrl}: PostManageBarProps) => {
  const {t} = useI18n();

  return (
    <Row>
      <Col>
        {
          editPostUrl &&
            <NextLink href={editPostUrl} passHref>
              <Button variant="outline-info" className="float-right ml-2 mb-3">
                {t((t) => t.posts.manage.edit)}
              </Button>
            </NextLink>
        }
        {
          newButtons.map(({url, title}, idx) => (
            <NextLink href={url} key={idx} passHref>
              <Button variant="outline-success" className="float-right ml-2 mb-3">
                {title || t((t) => t.posts.manage.add)}
              </Button>
            </NextLink>
          ))
        }
      </Col>
    </Row>
  );
};
