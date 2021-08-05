import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaAnalysisGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../../elements/common/ads/main';
import {Markdown} from '../../../../elements/markdown/main';
import {AnalysisSkillOutput} from './charaSkill';
import {SectionProps} from './props';


export const AnalysisOutputCharaBody = ({analysis}: SectionProps<CharaAnalysisGetResponse>) => {
  const {t} = useI18n();

  return (
    <>
      {
        analysis.forceStrikes &&
        <>
          <h3 className="mb-3">
            {t((t) => t.posts.analysis.forceStrike)}
          </h3>
          <Markdown>{analysis.forceStrikes || 'N/A'}</Markdown>
        </>
      }
      <h3 className="my-3">
        {t((t) => t.posts.analysis.skills)}
      </h3>
      {
        analysis.skills.map((skill, skillIdx) => {
          return (
            <div key={`skill-info-${skillIdx}`} className="mt-2">
              <AnalysisSkillOutput
                name={skill.name}
                info={skill.info}
                rotations={skill.rotations}
                tips={skill.tips}
              />
            </div>
          );
        })
      }
      <hr/>
      <AdsInPost/>
      <Row>
        <Col>
          <h3 className="mb-3">
            {t((t) => t.posts.analysis.tipsBuilds)}
          </h3>
          <Markdown>{analysis.tipsBuilds}</Markdown>
        </Col>
      </Row>
    </>
  );
};
