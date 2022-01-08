import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {UnitNameRefEntry as UnitNameRefEntryApi} from '../../../../api-def/api';
import {UnitInfoMap} from '../../../../api-def/resources';
import {formControlHeight} from '../../../../const/style';
import {useI18n} from '../../../../i18n/hook';
import {ArrayFormOnChangeHandler} from '../../../elements/form/array/type';
import {UnitIcon} from '../../../elements/gameData/unit/icon';


type UnitNameRefEntryProps = {
  entry: UnitNameRefEntryApi,
  onChanged: ArrayFormOnChangeHandler<UnitNameRefEntryApi>,
  isNameInvalid: boolean,
  unitInfoMap: UnitInfoMap<number>,
};

export const UnitNameRefEntry = ({entry, onChanged, isNameInvalid, unitInfoMap}: UnitNameRefEntryProps) => {
  const {t, lang} = useI18n();

  const unitInfo = unitInfoMap.get(entry.unitId);

  const isNameInputAllowed = !!unitInfo;

  return (
    <div className="section">
      <Form.Row>
        <Col lg={2}>
          <Form.Label>{t((t) => t.game.nameRef.unitId)}</Form.Label>
          <Form.Control
            isValid={isNameInputAllowed} isInvalid={!isNameInputAllowed}
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
                    <UnitIcon unitInfo={unitInfo} className="ml-1" style={{height: formControlHeight}}/>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    <span className="h5 mb-0">{unitInfo.name[lang]}</span>
                  </Col>
                </> :
                <Col
                  className="d-flex align-items-center justify-content-center text-danger"
                  style={{height: formControlHeight}}
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
            isInvalid={!entry.name || isNameInvalid}
            disabled={!isNameInputAllowed}
            value={entry.name}
          />
        </Col>
      </Form.Row>
    </div>
  );
};
