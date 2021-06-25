import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AnalysisBody} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export type FormBottomProps<P extends AnalysisBody> = PostFormDataProps<P>

export const FormBottom = <P extends AnalysisBody>({formState, setPayload}: FormBottomProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.videos)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('videos', e.target.value)}
            rows={5} value={payload.videos}
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.story)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('story', e.target.value)}
            rows={5} value={payload.story}
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t((t) => t.posts.analysis.keywords)}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('keywords', e.target.value)}
            rows={5} value={payload.keywords}
          />
        </Col>
      </Row>
    </>
  );
};
