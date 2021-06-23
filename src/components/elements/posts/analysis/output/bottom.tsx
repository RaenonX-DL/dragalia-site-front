import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../markdown/main';
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
        </>
      }
      {
        analysis.story &&
        <>
          <hr/>
          <Row>
            <Col>
              <h4 className="mb-3">
                {t((t) => t.posts.analysis.story)}
              </h4>
              <Markdown>{analysis.story}</Markdown>
            </Col>
          </Row>
        </>
      }
      {
        analysis.keywords &&
        <>
          <hr/>
          <Row>
            <Col>
              <h4 className="mb-3">
                {t((t) => t.posts.analysis.keywords)}
              </h4>
              <Markdown>{analysis.keywords}</Markdown>
            </Col>
          </Row>
        </>
      }
    </>
  );
};
