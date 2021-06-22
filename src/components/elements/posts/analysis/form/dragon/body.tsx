import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {DragonAnalysisPayload} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {MarkdownInput} from '../../../../markdown/input';
import {PostFormDataProps} from '../../../shared/form/types';

export const DragonAnalysisForm = <P extends DragonAnalysisPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.ultimate)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('ultimate', e.target.value)}
            rows={5} value={payload.ultimate} required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.notesDragon)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('notes', e.target.value)}
            rows={10} value={payload.notes} required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.suitable)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('suitableCharacters', e.target.value)}
            rows={7} value={payload.suitableCharacters} required
          />
        </Col>
      </Row>
      <div className="mb-3"/>
    </>
  );
};
