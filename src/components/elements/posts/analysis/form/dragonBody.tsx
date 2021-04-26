import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {DragonAnalysisPayload} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export const DragonAnalysisForm = ({formState, setPayload}: PostFormDataProps<DragonAnalysisPayload>) => {
  const {t} = useTranslation();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.ultimate')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('ultimate', e.target.value)}
            rows={5} value={payload.ultimate} required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.notes_dragon')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('notes', e.target.value)}
            rows={10} value={payload.notes} required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.suitable')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('suitableCharacters', e.target.value)}
            rows={7} value={payload.suitableCharacters} required
          />
        </Col>
      </Row>
    </>
  );
};
