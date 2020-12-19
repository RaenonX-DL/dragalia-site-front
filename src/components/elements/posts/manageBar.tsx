import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useTranslation} from 'react-i18next';


export type PostManageBarProps = {
  newPostUrl: string,
  newPostTitle?: string,
  newPostUrl2?: string,
  newPostTitle2?: string,
  editPostUrl?: string
}


export const PostManageBar = (props: PostManageBarProps) => {
  const {newPostUrl, newPostTitle, newPostUrl2, newPostTitle2, editPostUrl} = props;

  const {t} = useTranslation();

  return (
    <Row>
      <Col>
        {
          editPostUrl &&
            <LinkContainer to={editPostUrl}>
              <Button variant="outline-info" className="float-right">
                {t('posts.manage.edit')}
              </Button>
            </LinkContainer>
        }
        {
          newPostUrl2 &&
            <LinkContainer to={newPostUrl2}>
              <Button variant="outline-success" className="float-right mr-2">
                {newPostTitle2 || t('posts.manage.add')}
              </Button>
            </LinkContainer>
        }
        {
          newPostUrl &&
            <LinkContainer to={newPostUrl}>
              <Button variant="outline-success" className="float-right mr-2">
                {newPostTitle || t('posts.manage.add')}
              </Button>
            </LinkContainer>
        }
      </Col>
    </Row>
  );
};
