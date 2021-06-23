import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {
  DepotPaths,
  ConditionEnumMap,
  CharaExAbilityDataEntry,
} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {Image} from '../../../common/image';
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
      <Row noGutters>
        <Col xs="auto" className="align-middle">
          <Image src={charaIconURL} text={charaName} style={{height: '4rem'}}/>
        </Col>
        <Col>
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
            <Col>
              <ExAbility
                effectUnits={entry.chainedEx}
                name={t((t) => t.game.ex.name.chainedExAbility)}
                description={t((t) => t.game.ex.desc.chainedExAbility)}
                conditionEnums={conditionEnums}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
