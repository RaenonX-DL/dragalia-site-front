import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaExAbilityDataEntry, ConditionEnumMap, DepotPaths} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../common/image';
import {UnitLink} from '../../unitInfo/link';
import {ExAbility} from './exUnit';


type ExAbilityEntryProps = {
  entry: CharaExAbilityDataEntry
  conditionEnums: ConditionEnumMap,
}

export const ExAbilityEntry = ({entry, conditionEnums}: ExAbilityEntryProps) => {
  const {t, lang} = useI18n();

  const charaName = entry.chara.name[lang];
  const charaIconURL = DepotPaths.getCharaIconURL(entry.chara.iconName);

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters className="align-items-center">
        <Col xs="auto">
          <ImageWithOverlay src={charaIconURL} text={charaName} style={{height: '3rem'}}/>
        </Col>
        <Col className="text-center">
          <UnitLink
            unit={{id: entry.chara.id, name: entry.chara.name[lang]}}
            style={{fontSize: '1.1rem'}}
          />
        </Col>
      </Row>
      <hr className="m-1"/>
      <Row noGutters>
        <Col>
          <ExAbility
            effectUnits={entry.ex}
            name={t((t) => t.game.ex.name.exAbility)}
            description={t((t) => t.game.ex.desc.exAbility)}
            conditionEnums={conditionEnums}
            isEx
          />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <ExAbility
            effectUnits={entry.chainedEx}
            name={t((t) => t.game.ex.name.chainedExAbility)}
            description={t((t) => t.game.ex.desc.chainedExAbility)}
            conditionEnums={conditionEnums}
          />
        </Col>
      </Row>
    </div>
  );
};
