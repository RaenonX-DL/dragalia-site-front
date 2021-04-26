import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';


export type AnalysisSkillOutputProps = {
  name: string,
  info: string,
  rotations: string,
  tips: string
};

export const AnalysisSkillOutput = ({name, info, rotations, tips}: AnalysisSkillOutputProps) => {
  const {t} = useTranslation();

  const hasAllInfo = rotations && tips;

  return (
    <div className="rounded bg-black-32 p-3">
      <Row>
        <Col>
          <PageAnchor name={name} type="h3" text={name}/>
        </Col>
      </Row>
      <Row>
        <Col lg={hasAllInfo ? 6 : 12}>
          <h5 className="text-center pb-2 border-bottom">{t('posts.analysis.skill.info')}</h5>
          <Markdown>{info}</Markdown>
        </Col>
        {
          (rotations || tips) &&
          <Col lg={tips ? 6 : 12}>
            {
              rotations &&
              <>
                <h5 className="text-center pb-2 border-bottom">{t('posts.analysis.skill.rotations')}</h5>
                <Markdown>{rotations}</Markdown>
              </>
            }
            {hasAllInfo && <div className="mb-3"/>}
            {
              tips &&
              <>
                <h5 className="text-center pb-2 border-bottom">{t('posts.analysis.skill.tips')}</h5>
                <Markdown>{tips}</Markdown>
              </>
            }
          </Col>
        }
      </Row>
    </div>
  );
};
