import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';

import {DepotPaths, AfflictionUnit} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../common/image';
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
            <React.Fragment key={index}>
              <ImageWithOverlay
                text={affliction.statusIcon}
                src={DepotPaths.getAfflictionIconURL(affliction.statusIcon)}
                style={{width: '1.5rem'}}
              />
              &nbsp;
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
            </React.Fragment>
          ))
      }
    </Col>
  );
};
