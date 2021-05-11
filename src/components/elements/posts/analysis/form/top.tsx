import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {AnalysisPayload} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export type FormTopProps<P extends AnalysisPayload> = PostFormDataProps<P>

export const FormTop = <P extends AnalysisPayload>({
  formState, setPayload,
}: FormTopProps<P>) => {
  const {t} = useTranslation();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.summary')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('summary', e.target.value)}
            rows={5} value={payload.summary} required
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.summon_result')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('summon', e.target.value)}
            rows={4} value={payload.summon}
          />
        </Col>
      </Row>
      <hr/>
      <Row className="mb-3">
        <Col>
          <h5>{t('posts.analysis.passive')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('passives', e.target.value)}
            rows={7} value={payload.passives} required
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>{t('posts.analysis.normal_attack')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('normalAttacks', e.target.value)}
            rows={5} value={payload.normalAttacks}
          />
        </Col>
      </Row>
    </>
  );
};
