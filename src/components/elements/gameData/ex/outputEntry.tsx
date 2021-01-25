import React from 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DepotPaths} from '../../../../utils/services/resources/paths';
import {
  AbilityVariantEffectUnitData,
  ConditionEnumMap,
  ExAbilityDataEntry,
} from '../../../../utils/services/resources/types';
import {OverlayTooltip} from '../../express/overlay';
import {getConditionBadges} from '../common/condition';


type ExAbilityEntryProps = {
  entry: ExAbilityDataEntry
  conditionEnums: ConditionEnumMap,
}


export const getEntryBadges = (
  entry: AbilityVariantEffectUnitData, conditionEnums: ConditionEnumMap, skipOccurrences: boolean = false,
) => {
  const {t, i18n} = useTranslation();

  const badges = getConditionBadges({conditionCodes: entry.conditions, conditionEnums: conditionEnums});

  if (entry.cooldownSec !== 0) {
    badges.push(<Badge variant="info">{t('game.ex.badge.info_cooldown', {cooldownSec: entry.cooldownSec})}</Badge>);
  }
  if (entry.durationCount !== 0) {
    badges.push(
      <Badge variant="info">{t('game.ex.badge.info_duration_count', {durationCount: entry.durationCount})}</Badge>,
    );
  }
  if (entry.durationSec !== 0) {
    badges.push(<Badge variant="info">{t('game.ex.badge.info_duration_sec', {durationSec: entry.durationSec})}</Badge>);
  }
  if (!skipOccurrences && entry.maxOccurrences !== 0) {
    badges.push(
      <Badge variant="info">{t('game.ex.badge.info_max_occurrences', {maxOccurrences: entry.maxOccurrences})}</Badge>,
    );
  }
  if (entry.maxStackCount !== 0) {
    badges.push(
      <Badge variant="info">{t('game.ex.badge.info_max_stack_count', {maxStackCount: entry.maxStackCount})}</Badge>,
    );
  }
  if (entry.probabilityPct !== 0 && entry.probabilityPct !== 100) {
    badges.push(
      <Badge variant="info">{t('game.ex.badge.info_probability_pct', {probabilityPct: entry.probabilityPct})}</Badge>,
    );
  }
  if (entry.targetAction[i18n.language]) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_target_action', {targetAction: entry.targetAction[i18n.language]})}
      </Badge>,
    );
  }

  return badges;
};


export const ExAbilityEntry = ({entry, conditionEnums}: ExAbilityEntryProps) => {
  const {t, i18n} = useTranslation();

  // region Entry info
  const charaName = entry.chara.name[i18n.language];
  const charaIconURL = DepotPaths.getCharaIconURL(entry.chara.iconName);
  // endregion

  // region Sections
  const ImageIcon = () => (
    <OverlayTooltip text={charaName}>
      <img src={charaIconURL} alt={charaName} style={{height: '4rem'}}/>
    </OverlayTooltip>
  );

  type ExAbilityProps = {
    effectUnits: Array<AbilityVariantEffectUnitData>,
    name: string,
    description: string,
    isEx?: boolean
  }

  const ExAbility = ({effectUnits, name, description, isEx = false}: ExAbilityProps) => (
    <div className="text-center">
      <Row>
        <Col>
          <OverlayTooltip text={description}>
            <span>{name}</span>
          </OverlayTooltip>
        </Col>
      </Row>
      {
        effectUnits.map((effectUnit, index) => {
          const badges = getEntryBadges(effectUnit, conditionEnums, isEx);

          let rate = effectUnit.rate;
          if (effectUnit.paramUnit.isPercentage) {
            rate *= 100;
          }

          return (
            <React.Fragment key={index}>
              <Row>
                <Col style={{fontSize: '1.1rem'}}>
                  <OverlayTooltip text={effectUnit.parameter.name[i18n.language]}>
                    <img
                      src={DepotPaths.getImageURL(effectUnit.parameter.imagePath)}
                      alt={effectUnit.parameter.name[i18n.language]} style={{height: '2rem'}}/>
                  </OverlayTooltip>
                  <span className="align-middle">
                    &nbsp;{rate.toFixed(0)}&nbsp;{effectUnit.paramUnit.name[i18n.language]}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  {
                    badges.map((badge, idx: number) => {
                      return (
                        <React.Fragment key={idx}>
                          {idx > 0 && ' '}{badge}
                        </React.Fragment>
                      );
                    })
                  }
                </Col>
              </Row>
            </React.Fragment>
          );
        })
      }
    </div>
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
                effectUnits={entry.ex} name={t('game.ex.name.ex_ability')}
                description={t('game.ex.desc.ex_ability')} isEx/>
            </Col>
            <Col>
              <ExAbility
                effectUnits={entry.chainedEx} name={t('game.ex.name.chained_ex_ability')}
                description={t('game.ex.desc.chained_ex_ability')}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
