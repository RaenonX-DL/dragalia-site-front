import React from 'react';

import Col from 'react-bootstrap/Col';

import {getBadgesBuffCount} from '../badges/buffCount';
import {getBadgesBuffZone} from '../badges/buffZone';
import {getBadgesCrisisMod} from '../badges/crisisMod';
import {getBadgesDispel} from '../badges/dispel';
import {SectionProps} from '../props';


export const SectionBadges = ({atkSkillEntry}: SectionProps) => {
  let badges: Array<React.ReactElement> = [];

  badges = badges.concat(getBadgesBuffCount(atkSkillEntry));
  badges = badges.concat(getBadgesBuffZone(atkSkillEntry));
  badges = badges.concat(getBadgesDispel(atkSkillEntry));
  badges = badges.concat(getBadgesCrisisMod(atkSkillEntry));

  // -- Early terminate if no special badge
  if (badges.length === 0) {
    return <></>;
  }

  return (
    <Col lg className="text-left text-lg-right my-auto">
      {
        badges
          .map((badge: React.ReactElement, index: number) => (
            <React.Fragment key={index}>
              {index > 0 && ' '}
              {badge}
            </React.Fragment>
          ))
      }
    </Col>
  );
};
