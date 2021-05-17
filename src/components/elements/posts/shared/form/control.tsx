import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';

import {PostMetaPayload} from '../../../../../api-def/api/base/payload';
import {useI18n} from '../../../../../i18n/hook';
import {isFormStateValid, PostFormState} from './types';

type FormControlProps<P extends PostMetaPayload> = {
  formState: PostFormState<P>,
}

export const FormControl = <P extends PostMetaPayload>({formState}: FormControlProps<P>) => {
  const {t} = useI18n();

  return (
    <Row className="mb-6">
      <Col>
        <Button type="submit" className="float-right" disabled={!isFormStateValid(formState)}>
          {
            formState.isPreloaded ?
              t((t) => t.posts.manage.edit) :
              t((t) => t.posts.manage.publish)
          }
        </Button>
      </Col>
    </Row>
  );
};
