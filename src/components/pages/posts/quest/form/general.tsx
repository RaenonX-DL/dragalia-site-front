import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../../elements/markdown/input';
import {PostFormDataProps} from '../../../../elements/posts/form/types';


export const FormGeneralInfo = <P extends QuestPostPublishPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <Row className="g-3">
      <Col lg={6}>
        <MarkdownInput
          label={t((t) => t.posts.quest.general)}
          onChanged={(e) => setPayload('general', e.target.value)}
          rows={5}
          value={payload.general}
          required
        />
      </Col>
      <Col lg={6}>
        <MarkdownInput
          label={t((t) => t.posts.quest.video)}
          onChanged={(e) => setPayload('video', e.target.value)}
          rows={5}
          value={payload.video}
        />
      </Col>
    </Row>
  );
};
