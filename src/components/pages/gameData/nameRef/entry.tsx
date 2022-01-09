import React from 'react';

import Col from 'react-bootstrap/Col';

import {UnitNameRefEntry as UnitNameRefEntryApi} from '../../../../api-def/api';
import {UnitInfoMap} from '../../../../api-def/resources';
import {floatingControlHeight} from '../../../../const/style';
import {useI18n} from '../../../../i18n/hook';
import {RowRegular} from '../../../elements/common/grid/row';
import {ArrayFormOnChangeHandler} from '../../../elements/form/array/type';
import {FloatingInput} from '../../../elements/form/control/floating/input';
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
      <RowRegular className="p-2">
        <Col lg={2}>
          <FloatingInput
            label={t((t) => t.game.nameRef.unitId)}
            isValid={isNameInputAllowed}
            isInvalid={!isNameInputAllowed}
            onChange={(e) => {
              if (Number(e.target.value) || !e.target.value) {
                onChanged('unitId')(+e.target.value);
              }
            }}
            value={entry.unitId}
          />
        </Col>
        <Col lg={5}>
          <RowRegular>
            <Col>
              <FloatingInput
                label={t((t) => t.game.nameRef.actualName)}
                type="text"
                value={unitInfo?.name[lang] || ''}
                disabled
              />
            </Col>
            {
              unitInfo &&
              <Col xs="auto">
                <UnitIcon unitInfo={unitInfo} style={{height: floatingControlHeight}}/>
              </Col>
            }
          </RowRegular>
        </Col>
        <Col lg={5}>
          <FloatingInput
            label={t((t) => t.game.nameRef.desiredName)}
            onChange={(e) => onChanged('name')(e.target.value)}
            isInvalid={!entry.name || isNameInvalid}
            disabled={!isNameInputAllowed}
            value={entry.name}
          />
        </Col>
      </RowRegular>
    </div>
  );
};
