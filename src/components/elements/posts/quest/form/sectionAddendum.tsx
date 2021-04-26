import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {QuestPostPayload} from '../../../../../api-def/api/post/quest/payload';
import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export const FormAddendum = <P extends QuestPostPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useTranslation();

  const {payload} = formState;

  return (
    <>
      <h5>{t('posts.quest.addendum')}</h5>
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
