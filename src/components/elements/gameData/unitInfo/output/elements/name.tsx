import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaInfoData, UnitInfoDataBase} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {reverseEnumLookup} from '../../../../../../utils/services/resources/utils';
import {useUnitProps} from '../../../../../hooks/unitProps';
import {EnumEntryImageIcon} from '../../../enumIcon';


const isCharaInfo = (info: any): info is CharaInfoData => {
  return 'weapon' in info;
};

type CharaImageExtensionProps = {
  info: CharaInfoData,
}

const CharaImageExtension = ({info}: CharaImageExtensionProps) => {
  const {weaponEnums} = useUnitProps();
  const weaponEnum = reverseEnumLookup(weaponEnums.weapon, info.weapon);

  return <EnumEntryImageIcon height="2rem" entry={weaponEnum}/>;
};

export type UnitNameBlockProps = {
  info: UnitInfoDataBase,
}

export const UnitNameBlock = ({info}: UnitNameBlockProps) => {
  const {lang} = useI18n();
  const {elemEnums} = useUnitProps();

  const elemEnum = reverseEnumLookup(elemEnums.elemental, info.element);

  return (
    <Row>
      <Col className="d-flex align-items-center justify-content-center">
        <EnumEntryImageIcon height="2rem" entry={elemEnum}/>&nbsp;
        {isCharaInfo(info) && <><CharaImageExtension info={info}/>&nbsp;</>}
        <h4 className="d-inline mb-0">
          {info.name[lang]}
        </h4>
      </Col>
    </Row>
  );
};
