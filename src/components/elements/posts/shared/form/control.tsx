import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';

type FormControlProps = {
  isIdAvailable: boolean,
  isPostPreloaded: boolean,
}

export const FormControl = ({isIdAvailable, isPostPreloaded}: FormControlProps) => {
  const {t} = useTranslation();

  return (
    <Row className="mb-6">
      <Col>
        <Button type="submit" className="float-right" disabled={!isIdAvailable}>
          {isPostPreloaded ? t('posts.manage.edit') : t('posts.manage.publish')}
        </Button>
      </Col>
    </Row>
  );
};
