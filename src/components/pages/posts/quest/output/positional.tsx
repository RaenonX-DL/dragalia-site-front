import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PositionalInfo} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../../elements/markdown/main';
import {CollapsibleSectionedContent} from '../../../../elements/posts/output/section';


type Props = {
  info: Array<PositionalInfo>
};

export const QuestPositionOutput = ({info}: Props) => {
  const {t} = useI18n();

  return (
    <CollapsibleSectionedContent
      sections={info}
      getTitle={(info) => info.position}
      renderSection={(info) => (
        <Row>
          <Col lg={6}>
            <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.builds)}</h5>
            <Markdown>{info.builds}</Markdown>
            <div className="mb-2 mb-lg-0"/>
          </Col>
          <Col lg={6}>
            <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.rotations)}</h5>
            <Markdown>{info.rotations}</Markdown>
            <div className="mb-2"/>
            <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.tips)}</h5>
            <Markdown>{info.tips}</Markdown>
          </Col>
        </Row>
      )}
    />
  );
};
