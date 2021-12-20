import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {getBadgesBuffCount} from '../badges/buffCount';
import {getBadgesBuffZone} from '../badges/buffZone';
import {getBadgesCrisisMod} from '../badges/crisisMod';
import {getBadgesDispel} from '../badges/dispel';
import {SkillEntryProps} from '../entry';
import {EnumDataPack, SectionProps} from '../props';
import {SectionAffliction} from './affliction';


type Props = SectionProps & Pick<EnumDataPack, 'statusEnums'> & Pick<SkillEntryProps, 'displayConfig'>;

export const SectionAdditional = ({atkSkillEntry, displayConfig, statusEnums}: Props) => {
  let badges: Array<React.ReactElement> = [];

  badges = badges.concat(getBadgesBuffCount(atkSkillEntry));
  badges = badges.concat(getBadgesBuffZone(atkSkillEntry));
  badges = badges.concat(getBadgesDispel(atkSkillEntry));
  badges = badges.concat(getBadgesCrisisMod(atkSkillEntry));

  return (
    <>
      {
        !displayConfig.actualDamage && (!!atkSkillEntry.skill.afflictions.length || !!badges.length) &&
        <hr className="my-1"/>
      }
      <Row>
        {
          displayConfig.affliction &&
          <SectionAffliction atkSkillEntry={atkSkillEntry} statusEnums={statusEnums}/>
        }
        {
          !!badges.length &&
          <Col lg className="text-left text-lg-right my-auto">
            {badges.map((badge: React.ReactElement, index: number) => (
              <React.Fragment key={index}>
                {index > 0 && ' '}
                {badge}
              </React.Fragment>
            ))}
          </Col>
        }
      </Row>
    </>
  );
};
