import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {MiscPostSection} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ArrayFormOnChangeHandler} from '../../../../elements/form/array/type';
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
          <Form.Control
            className="mb-2"
            type="text" value={section.title}
            placeholder={t((t) => t.posts.misc.section.title)}
            onChange={(e) => onContentChanged('title')(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col className="pr-lg-2 mb-2">
          <Form.Label>{t((t) => t.posts.misc.section.content)}</Form.Label>
          <MarkdownInput
            rows={7} value={section.content}
            onChanged={(e) => onContentChanged('content')(e.target.value)}
            required
          />
        </Col>
      </Row>
    </div>
  );
};
