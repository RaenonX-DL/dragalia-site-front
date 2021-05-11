import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {PostEditPayload} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from './types';

type FormEditNoteProps<P extends PostEditPayload> = PostFormDataProps<P>

export const FormEditNote = <P extends PostEditPayload>({setPayload}: FormEditNoteProps<P>) => {
  const {t} = useTranslation();

  return (
    <>
      <h5>{t('posts.manage.modify_note')}</h5>
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
