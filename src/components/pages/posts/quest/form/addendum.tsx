import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../../elements/markdown/input';
import {PostFormDataProps} from '../../../../elements/posts/form/types';


export const FormAddendum = <P extends QuestPostPublishPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <Row>
      <Col>
        <MarkdownInput
          label={t((t) => t.posts.quest.addendum)}
          onChanged={(e) => setPayload('addendum', e.target.value)}
          rows={5}
          value={payload.addendum}
        />
      </Col>
    </Row>
  );
};
