import React, {ChangeEventHandler} from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Form, Row} from 'react-bootstrap';

import {MarkdownInput} from './markdownInput';

type QuestPositionInputProps = {
  onPositionNameChanged?: ChangeEventHandler<HTMLInputElement>,
  onBuildsChanged?: ChangeEventHandler<HTMLInputElement>,
  onRotationsChanged?: ChangeEventHandler<HTMLInputElement>,
  onTipsChanged?: ChangeEventHandler<HTMLInputElement>,
  onAnyChanged?: ChangeEventHandler<HTMLInputElement>,
  required?: Array<'all' | 'builds' | 'rotations' | 'tips'>,
};

export const QuestPositionForm = (props: QuestPositionInputProps) => {
  const {
    onPositionNameChanged, onBuildsChanged, onRotationsChanged, onTipsChanged,
    onAnyChanged,
    required = [],
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
            className="mb-2" type="text" placeholder={t('posts.quest.character')}
            onChange={onAnyInputChanged(onPositionNameChanged)} required
          />
        </Col>
      </Row>
      <Row>
        <Col lg={4} className="pr-lg-2 mb-2">
          <Form.Label>{t('posts.quest.builds')}</Form.Label>
          <MarkdownInput
            rows={7} onChanged={onAnyInputChanged(onBuildsChanged)}
            required={required.some((val) => val === 'all' || val === 'builds')}
          />
        </Col>
        <Col lg={4} className="px-lg-2 mb-2">
          <Form.Label>{t('posts.quest.rotations')}</Form.Label>
          <MarkdownInput
            rows={7} onChanged={onAnyInputChanged(onRotationsChanged)}
            required={required.some((val) => val === 'all' || val === 'rotations')}
          />
        </Col>
        <Col lg={4} className="pl-lg-2 mb-2">
          <Form.Label>{t('posts.quest.tips')}</Form.Label>
          <MarkdownInput
            rows={7} onChanged={onAnyInputChanged(onTipsChanged)}
            required={required.some((val) => val === 'all' || val === 'tips')}
          />
        </Col>
      </Row>
    </div>
  );
};
