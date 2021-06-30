import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';

import {DepotPaths, AfflictionUnit, StatusEnums} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {reverseEnumTransLookup} from '../../../../../../utils/services/resources/utils';
import {ImageWithOverlay} from '../../../../common/image';
import {EnumDataPack, SectionProps} from '../props';


type AfflictionEntryProps = {
  affliction: AfflictionUnit,
  statusEnums: StatusEnums,
}

const AfflictionEntry = ({affliction, statusEnums}: AfflictionEntryProps) => {
  const {t, lang} = useI18n();

  const afflictionName = reverseEnumTransLookup(
    statusEnums.status,
    affliction.statusCode,
    lang,
    affliction.statusCode.toString(),
  );

  // <div> for line separation
  return (
    <div>
      <ImageWithOverlay
        text={afflictionName}
        src={DepotPaths.getAfflictionIconURL(affliction.statusIcon)}
        style={{width: '1.5rem'}}
      />&nbsp;
      {t(
        (t) => t.game.skillAtk.entry.affliction,
        {
          affliction: afflictionName,
          afflictionTime: affliction.actionTime.toFixed(2),
          afflictionProbabilityPct: affliction.probabilityPct.toFixed(0),
          afflictionDuration: affliction.duration.toFixed(0),
        },
      )}&nbsp;
      {
        affliction.stackable ?
          <Badge variant="success">{t((t) => t.game.skillAtk.entry.stackable)}</Badge> :
          <Badge variant="danger">{t((t) => t.game.skillAtk.entry.unstackable)}</Badge>
      }
    </div>
  );
};

type SectionAfflictionProps = SectionProps & Pick<EnumDataPack, 'statusEnums'>

export const SectionAffliction = ({atkSkillEntry, statusEnums}: SectionAfflictionProps) => {
  if (!atkSkillEntry.skill.afflictions.length) {
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
            <AfflictionEntry affliction={affliction} statusEnums={statusEnums} key={index}/>
          ))
      }
    </Col>
  );
};
