import React, {ReactNode} from 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DepotPaths} from '../../../../utils/services/resources';
import {AfflictionUnit, ConditionEnumMap, SkillIdentifierInfo} from '../../../../utils/services/resources/types';
import {DistributionBar} from '../../charts';
import {OverlayTooltip} from '../../express';
import {ConditionBadges} from '../common/condition';

import {InputData} from './inputSection';
import {CalculatedData} from './outputMain';


type SkillEntryProps = {
  inputData?: InputData,
  calculatedData: CalculatedData,
  conditionEnumMap: ConditionEnumMap,
  skillIdentifierInfo: SkillIdentifierInfo,
}


export const AttackingSkillEntry = (props: SkillEntryProps) => {
  const {inputData, calculatedData, conditionEnumMap, skillIdentifierInfo} = props;

  const {t, i18n} = useTranslation();

  const atkSkillEntry = calculatedData.skillEntry;

  // region Early termination if no input data
  if (!inputData) {
    return <></>;
  }
  // endregion

  // region Entry info
  const charaName = atkSkillEntry.chara.name[i18n.language];
  const charaIconURL = DepotPaths.getCharaIconURL(atkSkillEntry.chara.iconName);

  // region Sections
  const ImageIcon = () => (
    <OverlayTooltip text={charaName}>
      <img src={charaIconURL} alt={charaName} style={{height: '4rem'}}/>
    </OverlayTooltip>
  );

  const SkillName = () => (
    <>
      <span className="h5">
        {
          atkSkillEntry.skill.identifiers
            .map((identifier) => skillIdentifierInfo[identifier].trans[i18n.language])
            .join(' / ')
        }
      </span>
      <br/>
      <small>{atkSkillEntry.skill.name[i18n.language]}</small>
    </>
  );

  const SkillInfo = () => (
    <>
      <span className="h5">{`${(calculatedData.skillDamage.totalMods * 100).toFixed(0)}%`}</span>
      <br/>
      <small>{atkSkillEntry.skill.hitsMax}&nbsp;HIT</small>
    </>
  );

  const SkillDamage = () => {
    const removeDigit = (num: number) => num.toLocaleString(undefined, {maximumFractionDigits: 0});

    return (
      <Row noGutters className="text-center">
        <Col className="my-auto">
          <small>{removeDigit(calculatedData.skillDamage.lowest)}</small>
        </Col>
        <Col className="my-auto">
          <span className="h4">{removeDigit(calculatedData.skillDamage.expected)}</span>
        </Col>
        <Col className="my-auto">
          <small>{removeDigit(calculatedData.skillDamage.highest)}</small>
        </Col>
      </Row>
    );
  };

  const DamageDistribution = () => (
    <DistributionBar data={atkSkillEntry.skill.modsMax} padding={0} height='0.5rem' displayText={false}/>
  );

  const Affliction = () => {
    if (atkSkillEntry.skill.afflictions.length === 0) {
      return <></>;
    }

    return (
      <Col lg>
        {
          atkSkillEntry.skill.afflictions
            .filter((item, idx, arr) => (
              arr.findIndex((afflictionUnit) => afflictionUnit.statusIcon === item.statusIcon) === idx
            ))
            .map((affliction: AfflictionUnit, index: number) => (
              <p key={index}>
                <img
                  src={DepotPaths.getAfflictionIconURL(affliction.statusIcon)}
                  alt={affliction.statusIcon} style={{width: '1.5rem'}}/>&nbsp;
                {t('game.skill_atk.entry.affliction',
                  {
                    afflictionTime: affliction.actionTime.toFixed(2),
                    afflictionProbabilityPct: affliction.probabilityPct,
                    afflictionDuration: affliction.duration,
                  })}&nbsp;
                {
                  affliction.stackable ?
                    <Badge variant="success">{t('game.skill_atk.entry.stackable')}</Badge> :
                    <Badge variant="danger">{t('game.skill_atk.entry.unstackable')}</Badge>
                }
              </p>
            ))
        }
      </Col>
    );
  };

  const Badges = () => {
    let badges: Array<ReactNode> = [];

    // Buff count boost available
    if (atkSkillEntry.skill.buffCountBoost.some((data) => data.each > 0)) {
      const maxEachPct = Math.max(...atkSkillEntry.skill.buffCountBoost.map((data) => data.each)) * 100;

      let tooltipText;
      if (atkSkillEntry.skill.buffCountBoost.some((data) => data.limit != 0)) {
        tooltipText = t(
          'game.skill_atk.entry.buff_count_desc_capped',
          {
            each: maxEachPct,
            limit: Math.max(...atkSkillEntry.skill.buffCountBoost.map((data) => data.limit)) * 100,
          },
        );
      } else {
        tooltipText = t('game.skill_atk.entry.buff_count_desc_uncapped', {each: maxEachPct});
      }

      badges = badges.concat([
        <OverlayTooltip key="buffCount" text={tooltipText}>
          <Badge key="buffCount" variant="primary">{t('game.skill_atk.entry.buff_count')}</Badge>
        </OverlayTooltip>,
      ]);
    }

    // Buff zone boost available
    if (atkSkillEntry.skill.buffZoneBoost.self > 0 || atkSkillEntry.skill.buffZoneBoost.ally > 0) {
      const tooltipText = t(
        'game.skill_atk.entry.buff_zone_desc',
        {
          selfBoost: atkSkillEntry.skill.buffZoneBoost.self * 100,
          allyBoost: atkSkillEntry.skill.buffZoneBoost.ally * 100,
        },
      );

      badges = badges.concat([
        <OverlayTooltip key="buffZone" text={tooltipText}>
          <Badge key="buffZone" variant="primary">{t('game.skill_atk.entry.buff_zone')}</Badge>
        </OverlayTooltip>,
      ]);
    }

    // Buff dispel available
    if (atkSkillEntry.skill.dispelMax) {
      const tooltipText = t(
        'game.skill_atk.entry.dispel_desc',
        {dispelTiming: atkSkillEntry.skill.dispelTimingMax[0].toFixed(2)},
      );

      badges = badges.concat([
        <OverlayTooltip key="dispel" text={tooltipText}>
          <Badge key="dispel" variant="orange">{t('game.skill_atk.entry.dispel')}</Badge>
        </OverlayTooltip>,
      ]);
    }

    // Crisis mods available
    if (atkSkillEntry.skill.crisisMax.some((data) => data !== 0 && data > 1)) {
      const tooltipText = t(
        'game.skill_atk.entry.crisis_up_desc',
        {maxRate: Math.max(...atkSkillEntry.skill.crisisMax).toFixed(2)},
      );

      badges = badges.concat([
        <OverlayTooltip key="crisisUp" text={tooltipText}>
          <Badge variant="danger">{t('game.skill_atk.entry.crisis_up')}</Badge>
        </OverlayTooltip>,
      ]);
    }
    if (atkSkillEntry.skill.crisisMax.some((data) => data !== 0 && data < 1)) {
      const tooltipText = t(
        'game.skill_atk.entry.crisis_down_desc',
        {maxRate: Math.max(...atkSkillEntry.skill.crisisMax).toFixed(2)},
      );

      badges = badges.concat([
        <OverlayTooltip key="crisisDown" text={tooltipText}>
          <Badge key="crisisDown" variant="danger">{t('game.skill_atk.entry.crisis_down')}</Badge>
        </OverlayTooltip>,
      ]);
    }

    // -- Early terminate if no special badge
    if (badges.length === 0) {
      return <></>;
    }

    return (
      <Col lg className="text-left text-lg-right my-auto">
        {
          badges
            .map((badge: ReactNode, index: number) => (
              <React.Fragment key={index}>
                {index > 0 && ' '}
                {badge}
              </React.Fragment>
            ))
        }
      </Col>
    );
  };
  // endregion

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters>
        <Col xs="auto" sm="auto" className="mr-2">
          <ImageIcon/>
        </Col>
        <Col className="my-auto">
          <SkillName/>
        </Col>
        <Col xs="auto" sm="auto" className="text-right my-auto">
          <SkillInfo/>
        </Col>
        <Col className="text-center my-auto" lg={5}>
          <SkillDamage/>
          <ConditionBadges conditionCodes={calculatedData.skillEntry.condition} conditionEnums={conditionEnumMap}/>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <DamageDistribution/>
        </Col>
      </Row>
      <Row>
        <Affliction/>
        <Badges/>
      </Row>
    </div>
  );
};
