import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export const FormGeneralInfo = <P extends QuestPostPublishPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <Row>
      <Col className="pr-2" lg={6}>
        <h5>{t((t) => t.posts.quest.general)}</h5>
        <MarkdownInput
          onChanged={(e) => setPayload('general', e.target.value)}
          rows={5} value={payload.general}
          required
        />
      </Col>
      <Col className="pl-2" lg={6}>
        <h5>{t((t) => t.posts.quest.video)}</h5>
        <MarkdownInput
          onChanged={(e) => setPayload('video', e.target.value)}
          rows={5} value={payload.video}
        />
      </Col>
    </Row>
  );
};
