import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useTranslation} from 'react-i18next';


type PostManageBarProps = {
  newPostUrl: string,
  editPostUrl?: string
}


export const PostManageBar = ({newPostUrl, editPostUrl}: PostManageBarProps) => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col>
        {
          editPostUrl ?
            <LinkContainer to={editPostUrl}>
              <Button variant="outline-info" className="float-right">{t('posts.manage.edit')}</Button>
            </LinkContainer> :
            <></>
        }
        {
          newPostUrl ?
            <LinkContainer to={newPostUrl}>
              <Button variant="outline-success" className="float-right mr-2">{t('posts.manage.add')}</Button>
            </LinkContainer> :
            <></>
        }
      </Col>
    </Row>
  );
};
