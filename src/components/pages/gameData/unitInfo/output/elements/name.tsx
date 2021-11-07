import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaInfoData, UnitInfoDataBase} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {reverseEnumLookup} from '../../../../../../utils/services/resources/utils';
import {EnumEntryImageIcon} from '../../../../../elements/gameData/enumIcon';
import {UnitLink} from '../../../../../elements/gameData/unit/link';
import {useUnitProps} from '../../../../../hooks/unitProps';


const isCharaInfo = (info: any): info is CharaInfoData => {
  return 'weapon' in info;
};

type CharaImageExtensionProps = {
  info: CharaInfoData,
};

const CharaImageExtension = ({info}: CharaImageExtensionProps) => {
  const {weaponEnums} = useUnitProps();
  const weaponEnum = reverseEnumLookup(weaponEnums.weapon, info.weapon);

  return <EnumEntryImageIcon height="2rem" entry={weaponEnum}/>;
};

export type UnitNameBlockProps = {
  info: UnitInfoDataBase,
};

export const UnitNameBlock = ({info}: UnitNameBlockProps) => {
  const {t, lang} = useI18n();
  const {elemEnums} = useUnitProps();

  const elemEnum = reverseEnumLookup(elemEnums.elemental, info.element);

  return (
    <>
      <Row className="mb-2">
        <Col className="d-flex align-items-center justify-content-center">
          <EnumEntryImageIcon height="2rem" entry={elemEnum}/>&nbsp;
          {isCharaInfo(info) && <><CharaImageExtension info={info}/>&nbsp;</>}
          <h4 className="d-inline mb-0">
            <UnitLink unit={{id: info.id, name: info.name[lang]}}/>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {t((t) => t.game.unitInfo.tips.clickNameForLinks)}
        </Col>
      </Row>
    </>
  );
};
