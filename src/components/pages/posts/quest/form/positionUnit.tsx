import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../i18n/hook';
import {FloatingInput} from '../../../../elements/form/control/floating/input';
import {MarkdownInput} from '../../../../elements/markdown/input';


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
    <div className="section p-3">
      <Row>
        <Col>
          <FloatingInput
            label={t((t) => t.posts.quest.character)}
            className="mb-3"
            type="text"
            value={positionName}
            onChange={(e) => onPositionNameChanged(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row className="g-3">
        <Col lg={4}>
          <MarkdownInput
            label={t((t) => t.posts.quest.builds)}
            rows={7}
            value={builds}
            onChanged={(e) => onBuildsChanged(e.target.value)}
            required
          />
        </Col>
        <Col lg={4}>
          <MarkdownInput
            label={t((t) => t.posts.quest.rotations)}
            rows={7}
            value={rotations}
            onChanged={(e) => onRotationsChanged(e.target.value)}
            required
          />
        </Col>
        <Col lg={4}>
          <MarkdownInput
            label={t((t) => t.posts.quest.tips)}
            rows={7}
            value={tips}
            onChanged={(e) => onTipsChanged(e.target.value)}
            required
          />
        </Col>
      </Row>
    </div>
  );
};
