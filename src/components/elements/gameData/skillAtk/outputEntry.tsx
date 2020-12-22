import React from 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DepotPaths} from '../../../../utils/services/resources';
import {AfflictionUnit} from '../../../../utils/services/resources/types';
import {DistributionBar} from '../../charts';
import {OverlayTooltip} from '../../express';

import {InputData} from './inputSection';
import {CalculatedData} from './outputMain';


type SkillEntryProps = {
  inputData?: InputData,
  calculatedData: CalculatedData,
}


export const AttackingSkillEntry = ({inputData, calculatedData}: SkillEntryProps) => {
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
      <span className="h5">{atkSkillEntry.skill.identifiers.join(' / ')}</span>
      <br/>
      <small>{atkSkillEntry.skill.name[i18n.language]}</small>
    </>
  );

  const SkillInfo = () => (
    <>
      <span className="h5">{`${(atkSkillEntry.skill.totalModsMax * 100).toFixed(0)}%`}</span>
      <br/>
      <small>{atkSkillEntry.skill.hitsMax}&nbsp;HIT</small>
    </>
  );

  const SkillDamage = () => {
    const removeDigit = (num: number) => num.toLocaleString(undefined, {maximumFractionDigits: 0});

    return (
      <>
        <Row>
          <Col>
            <h4>{removeDigit(calculatedData.skillDamage.expected)}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <small>{removeDigit(calculatedData.skillDamage.lowest)}</small>
          </Col>
          <Col>
            <small>{removeDigit(calculatedData.skillDamage.highest)}</small>
          </Col>
        </Row>
      </>
    );
  };

  const DamageDistribution = () => (
    <DistributionBar data={atkSkillEntry.skill.modsMax} padding={0} height='0.5rem' displayText={false}/>
  );

  const Affliction = () => (
    <>
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
    </>
  );
  // endregion

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters>
        <Col xs="auto" sm="auto" className="mr-2">
          <ImageIcon/>
        </Col>
        <Col xs="auto" sm="auto" className="my-auto">
          <SkillName/>
        </Col>
        <Col className="text-right my-auto">
          <SkillInfo/>
        </Col>
        <Col className="text-center my-auto" lg={5}>
          <SkillDamage/>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <DamageDistribution/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Affliction/>
        </Col>
      </Row>
    </div>
  );
};
