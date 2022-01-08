import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {PostEditPayload} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {PostFormDataProps} from './types';


type FormEditNoteProps<P extends PostEditPayload> = PostFormDataProps<P>;

export const FormEditNote = <P extends PostEditPayload>({setPayload}: FormEditNoteProps<P>) => {
  const {t} = useI18n();

  return (
    <>
      <h5>{t((t) => t.posts.manage.editNote)}</h5>
      <Row>
        <Col>
          <Form.Control
            className="mb-2" placeholder={t((t) => t.posts.manage.editNote)}
            onChange={(e) => setPayload('editNote', e.target.value)}
          />
        </Col>
      </Row>
    </>
  );
};
