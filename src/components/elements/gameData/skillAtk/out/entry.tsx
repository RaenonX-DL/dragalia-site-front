import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {ConditionEnumMap, SkillIdentifierInfo} from '../../../../../utils/services/resources/types';
import {DistributionBar} from '../../../charts';
import {ConditionBadges} from '../../elements/conditionBadges';
import {InputData} from '../in/types';
import {CalculatedData} from './main';
import {SectionAffliction} from './sectionAffliction';
import {SectionBadges} from './sectionBadges';
import {SectionImageIcon} from './sectionIcon';
import {SectionSkillDamage} from './sectionSkillDamage';
import {SectionSkillInfo} from './sectionSkillInfo';
import {SectionSkillName} from './sectionSkillName';


type SkillEntryProps = {
  inputData?: InputData,
  calculatedData: CalculatedData,
  conditionEnumMap: ConditionEnumMap,
  skillIdentifierInfo: SkillIdentifierInfo,
}


export const AttackingSkillEntry = ({
  inputData,
  calculatedData,
  conditionEnumMap,
  skillIdentifierInfo,
}: SkillEntryProps) => {
  const atkSkillEntry = calculatedData.skillEntry;

  // Early terminate if no input data
  if (!inputData) {
    return <></>;
  }

  return (
    <div className="rounded bg-black-32 p-2 mb-2">
      <Row noGutters>
        <Col xs="auto" sm="auto" className="mr-2">
          <SectionImageIcon atkSkillEntry={atkSkillEntry}/>
        </Col>
        <Col className="my-auto">
          <SectionSkillName atkSkillEntry={atkSkillEntry} skillIdentifierInfo={skillIdentifierInfo}/>
        </Col>
        <Col xs="auto" sm="auto" className="text-right my-auto">
          <SectionSkillInfo atkSkillEntry={atkSkillEntry} calculatedData={calculatedData}/>
        </Col>
        <Col className="text-center my-auto" lg={5}>
          <SectionSkillDamage calculatedData={calculatedData}/>
          <ConditionBadges conditionCodes={calculatedData.skillEntry.condition} conditionEnums={conditionEnumMap}/>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <DistributionBar data={atkSkillEntry.skill.modsMax} padding={0} height="0.5rem" displayText={false}/>
        </Col>
      </Row>
      <Row>
        <SectionAffliction atkSkillEntry={atkSkillEntry}/>
        <SectionBadges atkSkillEntry={atkSkillEntry}/>
      </Row>
    </div>
  );
};