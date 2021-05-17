import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {PostEditPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from './types';

type FormEditNoteProps<P extends PostEditPayload> = PostFormDataProps<P>

export const FormEditNote = <P extends PostEditPayload>({setPayload}: FormEditNoteProps<P>) => {
  const {t} = useI18n();

  return (
    <>
      <h5>{t((t) => t.posts.manage.modifyNote)}</h5>
      <Row>
        <Col>
          <MarkdownInput
            onChanged={(e) => setPayload('editNote', e.target.value)}
            rows={3}
          />
        </Col>
      </Row>
    </>
  );
};
