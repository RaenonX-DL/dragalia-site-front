import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../../../i18n/hook';
import {reverseEnumTransLookup} from '../../../../../../utils/services/resources/utils';
import {EnumDataPack, SectionProps} from '../props';
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

const CancelAction = ({atkSkillEntry, skillEnums, conditionEnumMap}: SectionAnimationProps) => {
  const {t, lang} = useI18n();

  const [show, setShow] = React.useState(false);

  const isAnyCancelHasPreconditions = atkSkillEntry.skill.cancelActionsMax
    .some((cancelUnit) => !!cancelUnit.conditions.length);
  const earliest = Math.min(...atkSkillEntry.skill.cancelActionsMax.map((cancelUnit) => cancelUnit.time));
  const isAvailable = earliest !== Infinity;

  return (
    <>
      <Button
        variant="outline-light" size="sm" className="mt-2"
        onClick={() => setShow(!show)} disabled={!isAvailable}
      >
        <i className="bi bi-arrows-collapse"/>&nbsp;
        {t((t) => t.game.skillAtk.animation.cancelInfo)}&nbsp;-&nbsp;
        {
          isAvailable ?
            t((t) => t.game.skillAtk.animation.earliest, {time: earliest.toFixed(2)}) :
            t((t) => t.game.skillAtk.animation.earliestUnavailable)
        }
      </Button>
      <Collapse in={show}>
        <div className="mt-2">
          <table>
            <thead>
              <tr>
                <th>{t((t) => t.game.skillAtk.animation.cancelHeader.action)}</th>
                <th>{t((t) => t.game.skillAtk.animation.cancelHeader.time)}</th>
                {
                  isAnyCancelHasPreconditions &&
                  <th>{t((t) => t.game.skillAtk.animation.cancelHeader.preConditions)}</th>
                }
              </tr>
            </thead>
            <tbody>
              {
                atkSkillEntry.skill.cancelActionsMax.map((cancelUnit, idx) => (
                  <tr key={idx}>
                    <td>{
                      reverseEnumTransLookup(
                        skillEnums.cancel,
                        cancelUnit.action,
                        lang,
                        cancelUnit.action.toString(),
                      )
                    }</td>
                    <td>{cancelUnit.time.toFixed(2)}</td>
                    {
                      isAnyCancelHasPreconditions &&
                      <td>{
                        cancelUnit.conditions
                          .map((conditionCode) => conditionEnumMap[String(conditionCode)].trans[lang])
                          .join(' & ')
                      }</td>
                    }
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

type SectionAnimationProps = SectionProps & Pick<EnumDataPack, 'skillEnums' | 'conditionEnumMap'>

export const SectionAnimation = ({atkSkillEntry, skillEnums, conditionEnumMap}: SectionAnimationProps) => {
  return (
    <div className={`${styles.section} text-center`}>
      <Form.Row>
        <Col lg={6}>
          <HitTiming atkSkillEntry={atkSkillEntry}/>
        </Col>
        <Col lg={6}>
          <CancelAction atkSkillEntry={atkSkillEntry} skillEnums={skillEnums} conditionEnumMap={conditionEnumMap}/>
        </Col>
      </Form.Row>
    </div>
  );
};
