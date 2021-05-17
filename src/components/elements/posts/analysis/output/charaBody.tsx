import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {CharacterAnalysis} from '../../../../../api-def/api/post/analysis/response';
import {useI18n} from '../../../../../i18n/hook';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';
import {AnalysisSkillOutput} from './charaSkill';
import {SectionProps} from './props';


export const AnalysisOutputCharaBody = ({analysis}: SectionProps<CharacterAnalysis>) => {
  const {t} = useI18n();

  return (
    <>
      {
        analysis.forceStrikes &&
        <>
          <PageAnchor
            name="fs" type="h3"
            text={t((t) => t.posts.analysis.forceStrike)}
            className="mb-3"
          />
          <div className="rounded bg-black-32 p-3">
            <Markdown>{analysis.forceStrikes || 'N/A'}</Markdown>
          </div>
        </>
      }
      <PageAnchor
        name="skills" type="h3"
        text={t((t) => t.posts.analysis.skills)}
        className="my-3"
      />
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
      <Row>
        <Col>
          <PageAnchor
            name="tips-builds" type="h3"
            text={t((t) => t.posts.analysis.tipsBuilds)}
            className="mb-3"
          />
          <Markdown>{analysis.tipsBuilds}</Markdown>
        </Col>
      </Row>
    </>
  );
};
