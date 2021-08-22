import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaExAbilityDataEntry, ConditionEnumMap} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {Optional} from '../../../../../utils/types';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../../elements/gameData/unit/link';
import {ExAbility} from './exUnit';


type ExAbilityEntryProps = Optional<CharaExAbilityDataEntry, 'chara'> & {
  conditionEnums: ConditionEnumMap,
}

export const ExAbilityEntry = ({chara, ex, chainedEx, conditionEnums}: ExAbilityEntryProps) => {
  const {t, lang} = useI18n();

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      {
        chara &&
        <>
          <Row noGutters className="align-items-center">
            <Col xs="auto">
              <UnitIcon unitInfo={chara} style={{height: '3rem'}}/>
            </Col>
            <Col className="text-center">
              <UnitLink unit={{id: chara.id, name: chara.name[lang]}} style={{fontSize: '1.1rem'}}/>
            </Col>
          </Row>
          <hr className="m-1"/>
        </>
      }
      <Row noGutters>
        <Col>
          <ExAbility
            effectUnits={ex}
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
            effectUnits={chainedEx}
            name={t((t) => t.game.ex.name.chainedExAbility)}
            description={t((t) => t.game.ex.desc.chainedExAbility)}
            conditionEnums={conditionEnums}
          />
        </Col>
      </Row>
    </div>
  );
};
