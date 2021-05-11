import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {useTranslation} from '../../../i18n/utils';

type NewButtonEntry = {
  url: string,
  title?: string,
}

export type PostManageBarProps = {
  newButtons: Array<NewButtonEntry>,
  editPostUrl?: string
}

export const PostManageBar = ({newButtons, editPostUrl}: PostManageBarProps) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col>
        {
          editPostUrl &&
            <LinkContainer to={editPostUrl}>
              <Button variant="outline-info" className="float-right ml-2">
                {t('posts.manage.edit')}
              </Button>
            </LinkContainer>
        }
        {
          newButtons.map(({url, title}, idx) => (
            <LinkContainer to={url} key={idx}>
              <Button variant="outline-success" className="float-right ml-2">
                {title || t('posts.manage.add')}
              </Button>
            </LinkContainer>
          ))
        }
      </Col>
    </Row>
  );
};
