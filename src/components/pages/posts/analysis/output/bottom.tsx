import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../../elements/markdown/main';
import {AlertVideoTips} from '../../../../elements/posts/alert';
import {SectionProps} from './props';


export const SectionBottom = <R extends AnalysisGetResponse>({analysis}: SectionProps<R>) => {
  const {t} = useI18n();

  return (
    <>
      {
        analysis.videos &&
        <>
          <hr/>
          <Row>
            <Col>
              <h4 className="mb-3">
                {t((t) => t.posts.analysis.videos)}
              </h4>
              <Markdown>{analysis.videos}</Markdown>
            </Col>
          </Row>
          <div className="mt-2">
            <AlertVideoTips/>
          </div>
        </>
      }
    </>
  );
};
