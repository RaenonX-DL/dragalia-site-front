import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {useI18n} from '../../../i18n/hook';

type NewButtonEntry = {
  url: string,
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
            <LinkContainer to={editPostUrl}>
              <Button variant="outline-info" className="float-right ml-2">
                {t((t) => t.posts.manage.edit)}
              </Button>
            </LinkContainer>
        }
        {
          newButtons.map(({url, title}, idx) => (
            <LinkContainer to={url} key={idx}>
              <Button variant="outline-success" className="float-right ml-2">
                {title || t((t) => t.posts.manage.add)}
              </Button>
            </LinkContainer>
          ))
        }
      </Col>
    </Row>
  );
};
