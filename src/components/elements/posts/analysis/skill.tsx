import React, {ChangeEventHandler} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {MarkdownInput} from '../../markdown/input';

import {Markdown} from '../../markdown/main';
import {PageAnchor} from '../pageAnchor';


export type AnalysisSkillInputProps = {
  onNameChanged?: ChangeEventHandler<HTMLInputElement>,
  onInfoChanged?: ChangeEventHandler<HTMLInputElement>,
  onRotationsChanged?: ChangeEventHandler<HTMLInputElement>,
  onTipsChanged?: ChangeEventHandler<HTMLInputElement>,
  onAnyChanged?: ChangeEventHandler<HTMLInputElement>,
  required?: Array<'all' | 'info' | 'rotations' | 'tips'>,
  name?: string,
  info?: string,
  rotations?: string,
  tips?: string,
};

export const AnalysisSkillInput = (props: AnalysisSkillInputProps) => {
  const {
    onNameChanged, onInfoChanged, onRotationsChanged, onTipsChanged, onAnyChanged,
    required = [],
    name = '', info = '', rotations = '', tips = '',
  } = props;

  const onAnyInputChanged = (eventHandler) => (e) => {
    if (eventHandler !== undefined) {
      eventHandler(e);
    }
    if (onAnyChanged !== undefined) {
      onAnyChanged(e);
    }
  };

  const {t} = useTranslation();

  return (
    <div className="rounded bg-black-32 p-3">
      <Row>
        <Col>
          <Form.Control
            className="mb-2" type="text" placeholder={t('posts.analysis.skill.name')}
            onChange={onAnyInputChanged(onNameChanged)} value={name} required
          />
        </Col>
      </Row>
      <Row>
        <Col lg={4} className="pr-lg-2 mb-2">
          <Form.Label>{t('posts.analysis.skill.info')}</Form.Label>
          <MarkdownInput
            rows={7} onChanged={onAnyInputChanged(onInfoChanged)} value={info}
            required={required.some((val) => val === 'all' || val === 'info')}
          />
        </Col>
        <Col lg={4} className="px-lg-2 mb-2">
          <Form.Label>{t('posts.analysis.skill.rotations')}</Form.Label>
          <MarkdownInput
            rows={7} onChanged={onAnyInputChanged(onRotationsChanged)} value={rotations}
            required={required.some((val) => val === 'all' || val === 'rotations')}
          />
        </Col>
        <Col lg={4} className="pl-lg-2 mb-2">
          <Form.Label>{t('posts.analysis.skill.tips')}</Form.Label>
          <MarkdownInput
            rows={7} onChanged={onAnyInputChanged(onTipsChanged)} value={tips}
            required={required.some((val) => val === 'all' || val === 'tips')}
          />
        </Col>
      </Row>
    </div>
  );
};

export type AnalysisSkillOutputProps = {
  name: string,
  info: string,
  rotations: string,
  tips: string
};

export const AnalysisSkillOutput = (props: AnalysisSkillOutputProps) => {
  const {name, info, rotations, tips} = props;

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
