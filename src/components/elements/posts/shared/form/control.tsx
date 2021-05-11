import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';

import {PostMetaPayload} from '../../../../../api-def/api/base/payload';
import {useTranslation} from '../../../../../i18n/utils';
import {isFormStateValid, PostFormState} from './types';

type FormControlProps<P extends PostMetaPayload> = {
  formState: PostFormState<P>,
}

export const FormControl = <P extends PostMetaPayload>({formState}: FormControlProps<P>) => {
  const {t} = useTranslation();

  return (
    <Row className="mb-6">
      <Col>
        <Button type="submit" className="float-right" disabled={!isFormStateValid(formState)}>
          {formState.isPreloaded ? t('posts.manage.edit') : t('posts.manage.publish')}
        </Button>
      </Col>
    </Row>
  );
};
