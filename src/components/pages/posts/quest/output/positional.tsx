import React from 'react';

import Col from 'react-bootstrap/Col';

import {PositionalInfo} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {RowRegular} from '../../../../elements/common/grid/row';
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
        <RowRegular className="mb-3">
          <Col lg={6}>
            <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.builds)}</h5>
            <Markdown>{info.builds}</Markdown>
          </Col>
          <Col lg={6}>
            <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.rotations)}</h5>
            <Markdown>{info.rotations}</Markdown>
            <div className="mb-3"/>
            <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.tips)}</h5>
            <Markdown>{info.tips}</Markdown>
          </Col>
        </RowRegular>
      )}
    />
  );
};
