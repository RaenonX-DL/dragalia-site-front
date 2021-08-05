import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AnalysisBody} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../../elements/markdown/input';
import {PostFormDataProps} from '../../../../elements/posts/form/types';


export type FormTopProps<P extends AnalysisBody> = PostFormDataProps<P>

export const FormTop = <P extends AnalysisBody>({
  formState, setPayload,
}: FormTopProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.summary)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('summary', e.target.value)}
            rows={5} value={payload.summary} required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.summonResult)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('summonResult', e.target.value)}
            rows={4} value={payload.summonResult}
          />
        </Col>
      </Row>
      <hr/>
      <Row className="mb-3">
        <Col>
          <h5>{t((t) => t.posts.analysis.passive)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('passives', e.target.value)}
            rows={7} value={payload.passives} required
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>{t((t) => t.posts.analysis.normalAttack)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('normalAttacks', e.target.value)}
            rows={5} value={payload.normalAttacks}
          />
        </Col>
      </Row>
    </>
  );
};
