import React from 'react';

import {Badge, Col} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {DepotPaths} from '../../../../../utils/services/resources/paths';
import {AfflictionUnit} from '../../../../../utils/services/resources/types/skillAtk';
import {SectionProps} from './props';


export const SectionAffliction = ({atkSkillEntry}: SectionProps) => {
  if (atkSkillEntry.skill.afflictions.length === 0) {
    return <></>;
  }

  const {t} = useTranslation();

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
