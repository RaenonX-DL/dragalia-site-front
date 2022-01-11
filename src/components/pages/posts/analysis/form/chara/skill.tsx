import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../i18n/hook';
import {RowRegular} from '../../../../../elements/common/grid/row';
import {FloatingInput} from '../../../../../elements/form/control/floating/input';
import {MarkdownInput} from '../../../../../elements/markdown/input';


export type AnalysisSkillInputProps = {
  onNameChanged: (newValue: string) => void,
  onInfoChanged: (newValue: string) => void,
  onRotationsChanged: (newValue: string) => void,
  onTipsChanged: (newValue: string) => void,
  required: Array<'info' | 'rotations' | 'tips'>,
  name: string,
  info: string,
  rotations: string,
  tips: string,
};

export const AnalysisSkillInput = ({
  onNameChanged,
  onInfoChanged,
  onRotationsChanged,
  onTipsChanged,
  required,
  name,
  info,
  rotations,
  tips,
}: AnalysisSkillInputProps) => {
  const {t} = useI18n();

  const inputRows = 7;

  return (
    <div className="section p-3">
      <Row>
        <Col>
          <FloatingInput
            className="mb-3"
            type="text"
            value={name}
            label={t((t) => t.posts.analysis.skill.name)}
            onChange={(e) => onNameChanged(e.target.value)}
            required
          />
        </Col>
      </Row>
      <RowRegular>
        <Col lg>
          <MarkdownInput
            label={t((t) => t.posts.analysis.skill.info)}
            rows={inputRows}
            value={info}
            onChanged={(e) => onInfoChanged(e.target.value)}
            required={required.some((val) => val === 'info')}
          />
        </Col>
        <Col lg>
          <MarkdownInput
            label={t((t) => t.posts.analysis.skill.rotations)}
            rows={inputRows}
            value={rotations}
            onChanged={(e) => onRotationsChanged(e.target.value)}
            required={required.some((val) => val === 'rotations')}
          />
        </Col>
        <Col lg>
          <MarkdownInput
            label={t((t) => t.posts.analysis.skill.tips)}
            rows={inputRows}
            value={tips}
            onChanged={(e) => onTipsChanged(e.target.value)}
            required={required.some((val) => val === 'tips')}
          />
        </Col>
      </RowRegular>
    </div>
  );
};
