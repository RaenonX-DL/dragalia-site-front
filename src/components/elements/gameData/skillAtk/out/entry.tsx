import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DistributionBar} from '../../../charts';
import {ConditionBadges} from '../../elements/conditionBadges';
import {InputData} from '../in/types';
import {EnumDataPack} from './props';
import {SectionAffliction} from './sections/affliction';
import {SectionAnimation} from './sections/animation';
import {SectionBadges} from './sections/badges';
import {SectionImageIcon} from './sections/icon';
import {SectionSkillDamage} from './sections/skillDamage';
import {SectionSkillInfo} from './sections/skillInfo';
import {SectionSkillName} from './sections/skillName';
import {SectionSpInfo} from './sections/sp/main';
import {CalculatedSkillEntry} from './types';


type SkillEntryProps = EnumDataPack & {
  displayConfig: InputData['display'],
  calculatedData: CalculatedSkillEntry,
}

export const AttackingSkillEntry = ({
  displayConfig,
  calculatedData,
  conditionEnumMap,
  skillIdentifierInfo,
  skillEnums,
  statusEnums,
}: SkillEntryProps) => {
  const atkSkillEntry = calculatedData.skillEntry;

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters>
        <Col xs="auto" sm="auto" className="mr-2">
          <SectionImageIcon atkSkillEntry={atkSkillEntry}/>
        </Col>
        <Col className="my-auto">
          <SectionSkillName atkSkillEntry={atkSkillEntry} skillIdentifierInfo={skillIdentifierInfo}/>
        </Col>
        {
          displayConfig.damageInfo &&
          <Col xs="auto" sm="auto" className="text-right my-auto">
            <SectionSkillInfo atkSkillEntry={atkSkillEntry} calculatedData={calculatedData}/>
          </Col>
        }
        {
          displayConfig.actualDamage &&
          <Col className="text-center my-auto" lg={5}>
            <SectionSkillDamage calculatedData={calculatedData}/>
            <ConditionBadges conditionCodes={calculatedData.skillEntry.condition}/>
          </Col>
        }
      </Row>
      {
        displayConfig.damageDist &&
        <Row className="text-center">
          <Col>
            <DistributionBar data={atkSkillEntry.skill.modsMax} padding={0} height="0.5rem" displayText={false}/>
          </Col>
        </Row>
      }
      <Row>
        {
          displayConfig.affliction &&
          <SectionAffliction atkSkillEntry={atkSkillEntry} statusEnums={statusEnums}/>
        }
        <SectionBadges atkSkillEntry={atkSkillEntry}/>
      </Row>
      {
        displayConfig.animationInfo &&
        <SectionAnimation atkSkillEntry={atkSkillEntry} skillEnums={skillEnums} conditionEnumMap={conditionEnumMap}/>
      }
      {
        displayConfig.spInfo &&
        <SectionSpInfo calculatedData={calculatedData} statusEnums={statusEnums}/>
      }
    </div>
  );
};
