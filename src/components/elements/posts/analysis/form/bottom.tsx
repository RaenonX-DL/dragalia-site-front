import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {AnalysisPayload} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';
import {PostFormDataProps} from '../../shared/form/types';

export type FormBottomProps<P extends AnalysisPayload> = PostFormDataProps<P>

export const FormBottom = <P extends AnalysisPayload>({formState, setPayload}: FormBottomProps<P>) => {
  const {t} = useTranslation();

  const {payload} = formState;

  return (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.videos')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('videos', e.target.value)}
            rows={5} value={payload.videos}
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.story')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('story', e.target.value)}
            rows={5} value={payload.story}
          />
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.keywords')}</h5>
          <MarkdownInput
            onChanged={(e) => setPayload('keywords', e.target.value)}
            rows={5} value={payload.keywords}
          />
        </Col>
      </Row>
    </>
  );
};
