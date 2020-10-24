import React from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';

import {QuestNewPostForm} from '../elements';
import Path from '../../constants/path';

export const QuestNew = () => {
  return (
    <>
      <QuestNewPostForm/>
    </>
  );
};

export const QuestDir = () => {
  const {t} = useTranslation();

  return (
    <>
      <Jumbotron>
        <h4 className="header">{t('posts.quest.dir')}</h4>
      </Jumbotron>
      <Row>
        <Col>
          <LinkContainer to={Path.QUEST_NEW}>
            <Button variant="outline-primary">{t('posts.manage.add')}</Button>
          </LinkContainer>
        </Col>
      </Row>
      {/* FIXME: Not displaying add button upon insufficient permission */}
      {/* TODO: Get the index page to render */}
      {/* TODO: other indexing things / button re-style */}
    </>
  );
};

export const QuestPage = () => {
  const {qid} = useParams();

  return (
    <>
      <h2>Quest {qid}</h2>
      {/* FIXME: Quest page content render */}
    </>
  );
};
