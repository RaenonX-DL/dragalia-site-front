import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../markdown/main';


export type AnalysisSkillOutputProps = {
  name: string,
  info: string,
  rotations: string,
  tips: string
};

export const AnalysisSkillOutput = ({name, info, rotations, tips}: AnalysisSkillOutputProps) => {
  const {t} = useI18n();

  const hasAdditionalInfo = rotations || tips;

  return (
    <div className="rounded bg-black-32 p-3">
      <Row>
        <Col>
          <h3>{name}</h3>
        </Col>
      </Row>
      <Row>
        <Col lg={hasAdditionalInfo ? 6 : 12}>
          <h5 className="text-center pb-2 border-bottom">
            {t((t) => t.posts.analysis.skill.info)}
          </h5>
          <Markdown>{info}</Markdown>
        </Col>
        {
          hasAdditionalInfo &&
          <Col lg={6}>
            {
              rotations &&
              <>
                <h5 className="text-center pb-2 border-bottom">
                  {t((t) => t.posts.analysis.skill.rotations)}
                </h5>
                <Markdown>{rotations}</Markdown>
              </>
            }
            {rotations && tips && <div className="mb-2"/>}
            {
              tips &&
              <>
                <h5 className="text-center pb-2 border-bottom">
                  {t((t) => t.posts.analysis.skill.tips)}
                </h5>
                <Markdown>{tips}</Markdown>
              </>
            }
          </Col>
        }
      </Row>
    </div>
  );
};
