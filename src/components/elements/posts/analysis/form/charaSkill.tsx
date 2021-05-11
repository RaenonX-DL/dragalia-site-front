import React from 'react';

import {Col, Form, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {MarkdownInput} from '../../../markdown/input';


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
  const {t} = useTranslation();

  const inputRows = 7;

  return (
    <div className="rounded bg-black-32 p-3">
      <Row>
        <Col>
          <Form.Control
            className="mb-2"
            type="text"
            value={name}
            placeholder={t('posts.analysis.skill.name')}
            onChange={(e) => onNameChanged(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col lg className="pr-lg-2 mb-2">
          <Form.Label>{t('posts.analysis.skill.info')}</Form.Label>
          <MarkdownInput
            rows={inputRows}
            value={info}
            onChanged={(e) => onInfoChanged(e.target.value)}
            required={required.some((val) => val === 'info')}
          />
        </Col>
        <Col lg className="px-lg-2 mb-2">
          <Form.Label>{t('posts.analysis.skill.rotations')}</Form.Label>
          <MarkdownInput
            rows={inputRows}
            value={rotations}
            onChanged={(e) => onRotationsChanged(e.target.value)}
            required={required.some((val) => val === 'rotations')}
          />
        </Col>
        <Col lg className="pl-lg-2 mb-2">
          <Form.Label>{t('posts.analysis.skill.tips')}</Form.Label>
          <MarkdownInput
            rows={inputRows}
            value={tips}
            onChanged={(e) => onTipsChanged(e.target.value)}
            required={required.some((val) => val === 'tips')}
          />
        </Col>
      </Row>
    </div>
  );
};
