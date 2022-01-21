import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../i18n/hook';
import {RowTight} from '../../common/grid/row';
import {FormCheck} from '../../common/input/check';


type Props = {
  sendEmail: boolean,
  onChangeSendEmail: (newValue: boolean) => void,
};

export const FormConfig = ({sendEmail, onChangeSendEmail}: Props) => {
  const {t} = useI18n();

  return (
    <RowTight>
      <Col/>
      <Col xs="auto">
        <FormCheck
          label={t((t) => t.posts.manage.sendUpdateEmail)}
          checked={sendEmail}
          onChange={onChangeSendEmail}
        />
      </Col>
    </RowTight>
  );
};
