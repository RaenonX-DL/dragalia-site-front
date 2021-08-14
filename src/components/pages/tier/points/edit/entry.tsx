import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {KeyPointEntryUpdate, KeyPointType, KeyPointTypeEnum} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ArrayDataFormOnChangedHandler} from '../../../../elements/posts/form/array/main';
import {keyPointTypeName} from '../../const';
import {PointTypeIcon} from '../../icons';


type Props = {
  entry: KeyPointEntryUpdate,
  onChanged: ArrayDataFormOnChangedHandler<KeyPointEntryUpdate>,
  isDescriptionInvalid: boolean,
}

export const KeyPointEntry = ({entry, onChanged, isDescriptionInvalid}: Props) => {
  const {t} = useI18n();

  return (
    <div className="bg-black-32 rounded p-2">
      <Form.Row>
        <Col lg={3}>
          <Form.Label>{t((t) => t.game.unitTier.points.type)}</Form.Label>
          <Row noGutters>
            <Col xs="auto" className="mr-2" style={{fontSize: '1.5em'}}>
              {PointTypeIcon[entry.type]}
            </Col>
            <Col>
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
          </Row>
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