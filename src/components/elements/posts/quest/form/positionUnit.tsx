import React from 'react';

import {Col, Form, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {MarkdownInput} from '../../../markdown/input';


export type QuestPositionInputProps = {
  onPositionNameChanged: (newValue: string) => void,
  onBuildsChanged: (newValue: string) => void,
  onRotationsChanged: (newValue: string) => void,
  onTipsChanged: (newValue: string) => void,
  positionName: string,
  builds: string,
  rotations: string,
  tips: string
};

export const QuestPositionUnit = ({
  onPositionNameChanged,
  onBuildsChanged,
  onRotationsChanged,
  onTipsChanged,
  positionName = '',
  builds = '',
  rotations = '',
  tips = '',
}: QuestPositionInputProps) => {
  const {t} = useI18n();

  return (
    <div className="rounded bg-black-32 p-3">
      <Row>
        <Col>
          <Form.Control
            className="mb-2"
            type="text" value={positionName}
            placeholder={t((t) => t.posts.quest.character)}
            onChange={(e) => onPositionNameChanged(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col lg={4} className="pr-lg-2 mb-2">
          <Form.Label>{t((t) => t.posts.quest.builds)}</Form.Label>
          <MarkdownInput
            rows={7} value={builds}
            onChanged={(e) => onBuildsChanged(e.target.value)}
            required
          />
        </Col>
        <Col lg={4} className="px-lg-2 mb-2">
          <Form.Label>{t((t) => t.posts.quest.rotations)}</Form.Label>
          <MarkdownInput
            rows={7} value={rotations}
            onChanged={(e) => onRotationsChanged(e.target.value)}
            required
          />
        </Col>
        <Col lg={4} className="pl-lg-2 mb-2">
          <Form.Label>{t((t) => t.posts.quest.tips)}</Form.Label>
          <MarkdownInput
            rows={7} value={tips}
            onChanged={(e) => onTipsChanged(e.target.value)}
            required
          />
        </Col>
      </Row>
    </div>
  );
};
