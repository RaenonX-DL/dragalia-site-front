import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../../../i18n/hook';
import {EnumDataPack, SectionProps} from '../props';
import {CancelAction} from './cancel/main';
import styles from './section.module.css';


const HitTiming = ({atkSkillEntry}: SectionProps) => {
  const {t} = useI18n();

  const [show, setShow] = React.useState(false);

  const earliest = Math.min(...atkSkillEntry.skill.hitTimingSecMax);

  return (
    <>
      <Button variant="outline-light" size="sm" className="mt-2" onClick={() => setShow(!show)}>
        <i className="bi bi-arrows-collapse"/>&nbsp;
        {t((t) => t.game.skillAtk.animation.hitTiming)}&nbsp;-&nbsp;
        {t((t) => t.game.skillAtk.animation.earliest, {time: earliest.toFixed(2)})}
      </Button>
      <Collapse in={show}>
        <div className="mt-2">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>{t((t) => t.game.skillAtk.animation.hitTimingHeader)}</th>
              </tr>
            </thead>
            <tbody>
              {
                atkSkillEntry.skill.hitTimingSecMax.map((timing, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{timing.toFixed(2)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};

export type SectionAnimationProps = SectionProps & Pick<EnumDataPack, 'skillEnums' | 'conditionEnumMap'>

export const SectionAnimation = ({atkSkillEntry, skillEnums, conditionEnumMap}: SectionAnimationProps) => {
  return (
    <div className={`${styles.section} text-center`}>
      <Form.Row>
        <Col lg={6}>
          <HitTiming atkSkillEntry={atkSkillEntry}/>
        </Col>
        <Col lg={6} className="mt-2">
          <CancelAction
            cancelUnits={atkSkillEntry.skill.cancelActionsMax}
            skillEnums={skillEnums}
            conditionEnumMap={conditionEnumMap}
          />
        </Col>
      </Form.Row>
    </div>
  );
};
