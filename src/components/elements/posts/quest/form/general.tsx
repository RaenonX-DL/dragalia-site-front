import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';


export const FormGeneralInfo = <P extends QuestPostPublishPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <Form.Row>
      <Col className="mb-3 mb-lg-0" lg={6}>
        <h5>{t((t) => t.posts.quest.general)}</h5>
        <MarkdownInput
          onChanged={(e) => setPayload('general', e.target.value)}
          rows={5} value={payload.general}
          required
        />
      </Col>
      <Col lg={6}>
        <h5>{t((t) => t.posts.quest.video)}</h5>
        <MarkdownInput
          onChanged={(e) => setPayload('video', e.target.value)}
          rows={5} value={payload.video}
        />
      </Col>
    </Form.Row>
  );
};
