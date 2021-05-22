import React from 'react';

import {Badge, Col} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {DepotPaths} from '../../../../../utils/services/resources/paths';
import {AfflictionUnit} from '../../../../../utils/services/resources/types';
import {SectionProps} from './props';


export const SectionAffliction = ({atkSkillEntry}: SectionProps) => {
  if (atkSkillEntry.skill.afflictions.length === 0) {
    return <></>;
  }

  const {t} = useI18n();

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
              {t((t) => t.game.skillAtk.entry.affliction,
                {
                  afflictionTime: affliction.actionTime.toFixed(2),
                  afflictionProbabilityPct: affliction.probabilityPct.toFixed(0),
                  afflictionDuration: affliction.duration.toFixed(0),
                })}&nbsp;
              {
                affliction.stackable ?
                  <Badge variant="success">{t((t) => t.game.skillAtk.entry.stackable)}</Badge> :
                  <Badge variant="danger">{t((t) => t.game.skillAtk.entry.unstackable)}</Badge>
              }
            </p>
          ))
      }
    </Col>
  );
};
