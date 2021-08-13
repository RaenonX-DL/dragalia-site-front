import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../../i18n/hook';
import {ArrayDataFormOnChangedHandler} from '../../../../elements/posts/form/array/main';
import {keyPointTypeName} from '../../const';
import {KeyPointEntryManage, KeyPointType, KeyPointTypeEnum} from '../../mock';


type Props = {
  entry: KeyPointEntryManage,
  onChanged: ArrayDataFormOnChangedHandler<KeyPointEntryManage>,
  isDescriptionInvalid: boolean,
}

export const KeyPointEntry = ({entry, onChanged, isDescriptionInvalid}: Props) => {
  const {t} = useI18n();

  return (
    <div className="bg-black-32 rounded p-2">
      <Form.Row>
        <Col lg={3}>
          <Form.Label>{t((t) => t.game.unitTier.points.type)}</Form.Label>
          {/* FIXME: Icon */}
          <Form.Control
            as="select" defaultValue={entry.type}
            onChange={(e) => onChanged('type')(e.target.value as KeyPointType)}
          >
            {Object.keys(KeyPointTypeEnum).map((type) => (
              <option key={type} value={type}>
                {t(keyPointTypeName[type as KeyPointType])}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col lg={9}>
          <Form.Label>{t((t) => t.game.unitTier.points.description)}</Form.Label>
          <Form.Control
            value={entry.description}
            isInvalid={isDescriptionInvalid || !entry.description}
            onChange={(e) => onChanged('description')(e.target.value)}
          />
        </Col>
      </Form.Row>
    </div>
  );
};
