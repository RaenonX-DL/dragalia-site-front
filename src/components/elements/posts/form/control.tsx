import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostMeta} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {isFormStateValid, PostFormState} from './types';


type FormControlProps<P extends PostMeta> = {
  formState: PostFormState<P>,
}

export const FormControl = <P extends PostMeta>({formState}: FormControlProps<P>) => {
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
