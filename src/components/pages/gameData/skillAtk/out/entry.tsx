import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DistributionBar} from '../../../../elements/charts/distBar';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {ConditionBadges} from '../../../../elements/gameData/badges/conditions';
import {InputData} from '../in/types';
import {EnumDataPack} from './props';
import {SectionAdditional} from './sections/additional';
import {SectionAnimation} from './sections/animation';
import {SectionImageIcon} from './sections/icon';
import {SectionSkillDamage} from './sections/skillDamage';
import {SectionSkillInfo} from './sections/skillInfo';
import {SectionSkillName} from './sections/skillName';
import {SectionSpInfo} from './sections/sp/main';
import {CalculatedSkillEntry} from './types';


export type SkillEntryProps = EnumDataPack & {
  displayConfig: InputData['display'],
  calculatedData: CalculatedSkillEntry,
};

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
    <div className="section mb-2">
      <RowNoGutter>
        <Col xs="auto" className="me-2">
          <SectionImageIcon atkSkillEntry={atkSkillEntry}/>
        </Col>
        <Col className="my-auto">
          <SectionSkillName atkSkillEntry={atkSkillEntry} skillIdentifierInfo={skillIdentifierInfo}/>
        </Col>
        {
          displayConfig.damageInfo &&
          <Col xs="auto" className="my-auto">
            <SectionSkillInfo atkSkillEntry={atkSkillEntry} calculatedData={calculatedData}/>
            {
              !displayConfig.actualDamage &&
              <ConditionBadges conditionCodes={calculatedData.skillEntry.condition}/>
            }
          </Col>
        }
        {
          displayConfig.actualDamage &&
          <Col className="text-center my-auto" lg={5}>
            <SectionSkillDamage calculatedData={calculatedData}/>
            <ConditionBadges conditionCodes={calculatedData.skillEntry.condition}/>
          </Col>
        }
      </RowNoGutter>
      {
        displayConfig.damageDist &&
        <Row className="text-center">
          <Col>
            <DistributionBar data={atkSkillEntry.skill.modsMax} padding={0} height="0.5rem" displayText={false}/>
          </Col>
        </Row>
      }
      <SectionAdditional
        atkSkillEntry={atkSkillEntry}
        statusEnums={statusEnums}
        displayConfig={displayConfig}
      />
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
