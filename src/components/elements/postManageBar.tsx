import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';
import {useTranslation} from 'react-i18next';

export const PostManageBar = ({newPostUrl}: {newPostUrl: string}) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col>
        <LinkContainer to={newPostUrl}>
          <Button variant="outline-success" className="float-right">{t('posts.manage.add')}</Button>
        </LinkContainer>
      </Col>
    </Row>
  );
};
