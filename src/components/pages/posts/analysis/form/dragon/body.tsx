import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DragonAnalysisPayload} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {MarkdownInput} from '../../../../../elements/markdown/input';
import {PostFormDataProps} from '../../../../../elements/posts/form/types';


export const DragonAnalysisForm = <P extends DragonAnalysisPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.posts.analysis.ultimate)}
            onChanged={(e) => setPayload('ultimate', e.target.value)}
            rows={5}
            value={payload.ultimate}
            required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.posts.analysis.notesDragon)}
            onChanged={(e) => setPayload('notes', e.target.value)}
            rows={10}
            value={payload.notes}
            required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.posts.analysis.suitable)}
            onChanged={(e) => setPayload('suitableCharacters', e.target.value)}
            rows={7}
            value={payload.suitableCharacters}
            required
          />
        </Col>
      </Row>
      <div className="mb-3"/>
    </>
  );
};
