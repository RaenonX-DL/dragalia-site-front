import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {AnalysisGetSuccessResponse} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';
import {SectionProps} from './props';

export const SectionBottom = <R extends AnalysisGetSuccessResponse>({analysis}: SectionProps<R>) => {
  const {t} = useTranslation();

  return (
    <>
      {
        analysis.videos &&
        <>
          <hr/>
          <Row>
            <Col>
              <PageAnchor name="videos" type="h4" text={t('posts.analysis.videos')} className="mb-3"/>
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
              <PageAnchor name="story" type="h4" text={t('posts.analysis.story')} className="mb-3"/>
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
              <PageAnchor name="keywords" type="h4" text={t('posts.analysis.keywords')} className="mb-3"/>
              <Markdown>{analysis.keywords}</Markdown>
            </Col>
          </Row>
        </>
      }
    </>
  );
};
