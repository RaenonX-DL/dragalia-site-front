import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
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
  const {t, lang} = useTranslation();

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
                name={t('game.ex.name.ex_ability')}
                description={t('game.ex.desc.ex_ability')}
                conditionEnums={conditionEnums}
                isEx
              />
            </Col>
            <Col>
              <ExAbility
                effectUnits={entry.chainedEx}
                name={t('game.ex.name.chained_ex_ability')}
                description={t('game.ex.desc.chained_ex_ability')}
                conditionEnums={conditionEnums}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
