import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {DepotPaths} from '../../../../../utils/services/resources/paths';
import {
  ConditionEnumMap,
  ExAbilityDataEntry,
} from '../../../../../utils/services/resources/types';
import {OverlayTooltip} from '../../../common/overlay/tooltip';
import {ExAbility} from './exUnit';


type ExAbilityEntryProps = {
  entry: ExAbilityDataEntry
  conditionEnums: ConditionEnumMap,
}


export const ExAbilityEntry = ({entry, conditionEnums}: ExAbilityEntryProps) => {
  const {t, lang} = useI18n();

  // region Entry info
  const charaName = entry.chara.name[lang];
  const charaIconURL = DepotPaths.getCharaIconURL(entry.chara.iconName);
  // endregion

  // region Sections
  const ImageIcon = () => (
    <OverlayTooltip text={charaName}>
      <img src={charaIconURL} alt={charaName} style={{height: '4rem'}}/>
    </OverlayTooltip>
  );

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters>
        <Col xs="auto" className="align-middle">
          <ImageIcon/>
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
