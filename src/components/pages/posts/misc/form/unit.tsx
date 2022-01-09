import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {MiscPostSection} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ArrayFormOnChangeHandler} from '../../../../elements/form/array/type';
import {FloatingInput} from '../../../../elements/form/control/floating/input';
import {MarkdownInput} from '../../../../elements/markdown/input';


type Props = {
  section: MiscPostSection,
  onContentChanged: ArrayFormOnChangeHandler<MiscPostSection>,
};

export const MiscSectionUnit = ({section, onContentChanged}: Props) => {
  const {t} = useI18n();

  return (
    <div className="section p-3">
      <Row>
        <Col>
          <FloatingInput
            label={t((t) => t.posts.misc.section.title)}
            className="mb-3"
            type="text"
            value={section.title}
            onChange={(e) => onContentChanged('title')(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.posts.misc.section.content)}
            rows={7}
            value={section.content}
            onChanged={(e) => onContentChanged('content')(e.target.value)}
            required
          />
        </Col>
      </Row>
    </div>
  );
};
