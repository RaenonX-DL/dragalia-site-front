import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostEditPayload} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {FloatingInput} from '../../form/control/floating/input';
import {PostFormDataProps} from './types';


type FormEditNoteProps<P extends PostEditPayload> = PostFormDataProps<P>;

export const FormEditNote = <P extends PostEditPayload>({setPayload}: FormEditNoteProps<P>) => {
  const {t} = useI18n();

  return (
    <Row>
      <Col>
        <FloatingInput
          label={t((t) => t.posts.manage.editNote)}
          placeholder={t((t) => t.posts.manage.editNote)}
          onChange={(e) => setPayload('editNote', e.target.value)}
        />
      </Col>
    </Row>
  );
};
