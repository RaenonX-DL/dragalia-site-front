import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export const FormAddendum = <P extends QuestPostPublishPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <>
      <h5>{t((t) => t.posts.quest.addendum)}</h5>
      <Row>
        <Col>
          <MarkdownInput
            onChanged={(e) => setPayload('addendum', e.target.value)}
            rows={5} value={payload.addendum}
          />
        </Col>
      </Row>
    </>
  );
};
