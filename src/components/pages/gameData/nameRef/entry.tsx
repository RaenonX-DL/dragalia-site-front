import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {UnitNameRefEntry as UnitNameRefEntryApi} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {UnitIcon} from '../../../elements/gameData/unitIcon';
import {ArrayDataFormOnChangedHandler} from '../../../elements/posts/shared/form/array';


type UnitNameRefEntryProps = {
  entry: UnitNameRefEntryApi,
  onChanged: ArrayDataFormOnChangedHandler<UnitNameRefEntryApi>,
}

export const UnitNameRefEntry = ({entry, onChanged}: UnitNameRefEntryProps) => {
  const {t, lang} = useI18n();
  const {unitInfoMap} = useUnitInfo();

  const unitInfo = unitInfoMap.get(entry.unitId);

  // This is the height of `form-control`
  const unitIconHeight = 'calc(1.5em + 0.75rem + 2px)';

  const isValid = !!unitInfo;

  return (
    <div className="bg-black-32 rounded p-2">
      <Form.Row>
        <Col lg={2}>
          <Form.Label>{t((t) => t.game.nameRef.unitId)}</Form.Label>
          <Form.Control
            isValid={isValid} isInvalid={!isValid}
            onChange={(e) => {
              if (Number(e.target.value) || !e.target.value) {
                onChanged('unitId')(+e.target.value);
              }
            }}
            value={entry.unitId}
          />
        </Col>
        <Col lg={5}>
          <Form.Label>{t((t) => t.game.nameRef.actualName)}</Form.Label>
          <Row noGutters>
            {
              unitInfo ?
                <>
                  <Col xs="auto">
                    <UnitIcon unitInfo={unitInfo} className="ml-1" style={{height: unitIconHeight}}/>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    <span className="h5 mb-0">{unitInfo.name[lang]}</span>
                  </Col>
                </> :
                <Col
                  className="d-flex align-items-center justify-content-center text-danger"
                  style={{height: unitIconHeight}}
                >
                  <span className="h5 mb-0">
                    {t((t) => t.game.nameRef.error.invalidUnitId)}
                  </span>
                </Col>
            }
          </Row>
        </Col>
        <Col lg={5}>
          <Form.Label>{t((t) => t.game.nameRef.desiredName)}</Form.Label>
          <Form.Control
            onChange={(e) => onChanged('name')(e.target.value)}
            isInvalid={!entry.name}
            disabled={!isValid}
            value={entry.name}
          />
        </Col>
      </Form.Row>
    </div>
  );
};
